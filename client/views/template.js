import {currentRoute, pageTitle, runTemplateHelper, templateName} from '../../lib/utils';
import {throwError} from '../../lib/logs';
import {currentUser} from '../../lib/users';

/**
 * @method subscribe
 * @param template
 * @param models
 * @param {function} [fn]
 */
export const subscribe = (template, models, fn) => {
  if (typeof models === 'string') {
    models = [models];
  }
  let subs = {};
  for (let i = 0; i < models.length; i++) {
    subs[models[i]] = template.subscribe(models[i]);
  }

  // Do reactive stuff when subscribe is ready
  Tracker.autorun(() => {
    let ready = 1;
    for (let i = 0; i < models.length; i++) {
      if (subs[models[i]].ready()) {
        ready++;
      }
    }
    if (ready < models.length) {
      return false;
    } else if (typeof fn === 'function') {
      fn();
    }
  });
};

Template.body.events({

  /**
   * @event Click
   * @param e
   * @param data
   */
  'click'(e, data) {
    const path = currentRoute().path;
    // Prevent tot track tracking
    if ((path || '').match(/tracking/)) return false;
    Meteor.call('createTrackingLog', {
          url: path,
          userId: (currentUser() || {})._id,
          event: e.type,
          location: {
            clientX: e.clientX,
            clientY: e.clientY
          },
          target: e.target.outerHTML
        },
        (error, result) => throwError(error) ? false : result
    );
  }
});

/**
 * Get the parent template instance
 * @method parentTemplate
 * @memberOf Blaze.TemplateInstance
 * @param {Number} [levels] How many levels to go up. Default is 1
 * @returns {Blaze.TemplateInstance}
 */
Blaze.TemplateInstance.prototype.parentTemplate = function(levels) {
  let view = this.view;
  if (typeof levels === 'undefined') {
    levels = 1;
  }
  while (view) {
    if (view.name.substring(0, 9) === 'Template.' && !(levels--)) {
      return view.templateInstance();
    }
    view = view.parentView;
  }
};

Template.registerHelper('formatDate', (date, format) => {
  if (format === 'long') format = 'MMMM DD, YYYY H:mm:ss';
  if (format === 'short') format = 'MM-DD-YYYY H:mm:ss';
  return moment(date).format(format);
});

/**
 * @method generatorUrl
 * @param id
 * @return {string}
 */
Template.registerHelper('generatorUrl', id => {
  const url = '/cv/generate';
  return id ? url + '/' + id : url;
});

Template.registerHelper('friendlyUrl', text => text.toLowerCase().replace(/ /g, '-'));

Template.registerHelper('fetchCountedTitle', function() {
  FlowRouter.watchPathChange();
  let title = pageTitle();
  const name = templateName();
  try {
    const counter = runTemplateHelper(Template[this.content()], name + 'Count');
    return [title, counter].join(': ');
  } catch (e) {
    return 'Admin Dashboard';
  }
});

Template.registerHelper('fetchTitle', () => {
  FlowRouter.watchPathChange();
  return pageTitle();
});

Template.registerHelper('redirectToBack', () => {
  const current = currentRoute();
  const oldRoute = current.oldRoute;
  const path = current.path;
  if (oldRoute) {
    //return oldRoute.path;
  }
  try {
    return path.replace(new RegExp(path.match(/\/\w+/g, '').pop()), '');
  } catch (e) {
    return '/';
  }
});

Template.registerHelper('generateDomId', (element) =>
    element.dataset.label.toLowerCase().replace(/[ .,\/#!$%^&*;:{}=\-_`~()]/g, '-'));
Template.registerHelper('ellipsis', str => s.prune(str, 100));
Template.registerHelper('moreInfoUrl', () => currentRoute().path);

Template.registerHelper('isPaginationReady', () => Template.instance().pagination.ready());
Template.registerHelper('templatePagination', () => Template.instance().pagination);
Template.registerHelper('documents', () => Template.instance().pagination.getPage());

/**
 * @method setHelperMethod
 * @param {string} templateName
 * @param {string} methodName
 * @param {*} returnedValue
 */
export const setHelperMethod = (templateName, methodName, returnedValue) => {

  /**
   * @constant template
   */
  const template = Template[templateName];

  if (!template) {
    return false;
  }

  /**
   * @constant _deps
   * @type {Tracker.Dependency}
   */
  const _deps = template.__helpers.get('deps');

  // Set helper method
  template.__helpers.set(methodName, () => {
    _deps.depend();
    return returnedValue;
  });

  // Trigger to change
  _deps.changed();
};
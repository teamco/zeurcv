import {runTemplateHelper, pageTitle, templateName, throwError, currentUser} from '../../lib/utils';

/**
 * @method subscribe
 * @param models
 */
export const subscribe = models => {
  if (typeof models === 'string') {
    models = [models];
  }
  for (let i = 0; i < models.length; i++) {
    Meteor.subscribe(models[i], () => subscribeCallback(models[i]));
  }
};

/**
 * @method subscribeCallback
 * @param model
 */
const subscribeCallback = (model) => {
  // TODO check subscription
};

Template.body.events({

  /**
   * @event Click
   * @param e
   * @param data
   */
  'click'(e, data) {
    const path = FlowRouter.current().path;
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
        (error, result) => {
          if (throwError(error)) {
            return false;
          }
        }
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
  const current = FlowRouter.current();
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

Template.registerHelper('ellipsis', str => s.prune(str, 100));
Template.registerHelper('moreInfoUrl', () => FlowRouter.current().path);
import {throwError} from '../../lib/logs';

FlowRouter.route('/', {
  action: () => {
    BlazeLayout.render('landingLayout');
  }
});

FlowRouter.route('/cv', {
  action: () => {
    BlazeLayout.render('adminLayout', {content: 'cv'});
  },
  name: 'profile'
});

FlowRouter.route('/pageOne', {
  action: () => {
    BlazeLayout.render('adminLayout', {content: 'pageOne'});
  }
});

/**
 * @method updateUserLog
 */
const updateUserLog = () => Meteor.call('updateUserLog', FlowRouter.current().path, error => {
  if (error) {
    return throwError(error);
  }
});

FlowRouter.triggers.enter(updateUserLog);
// FlowRouter.triggers.exit(updateUserLog);
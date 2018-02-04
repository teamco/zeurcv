import {throwError} from '../../lib/logs';
import {currentRoute} from '../../lib/utils';

FlowRouter.route('/', {
  action: () => {
    BlazeLayout.render('landingLayout');
  }
});

FlowRouter.route('/pageOne', {
  action: () => {
    BlazeLayout.render('adminLayout', {content: 'pageOne'});
  }
});

/**
 * @method updateUserLog
 */
const updateUserLog = () => Meteor.call('updateUserLog', currentRoute().path, error => {
  if (error) {
    return throwError(error);
  }
});

FlowRouter.triggers.enter(updateUserLog);
// FlowRouter.triggers.exit(updateUserLog);
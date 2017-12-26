import {subscribe} from '../template';

Template.adminDashboard.onRendered(function() {
  subscribe(this, ['users', 'userStatus', 'roles', 'userLogs', 'errorLogs']);
});

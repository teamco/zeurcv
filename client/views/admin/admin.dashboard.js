import {subscribe} from '../template';

Template.adminDashboard.onCreated(() => subscribe(['users', 'userStatus', 'roles', 'userLogs', 'errorLogs']));

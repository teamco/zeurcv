import {runAsAdmin} from '../../lib/users';
import {userLog} from '../../model/userLog.model';

Meteor.publish('userLogs', function() {
  return runAsAdmin(this.userId, userLog.find());
});
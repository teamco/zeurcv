import {accountProfile} from '../../model/accountProfile.model';
import {runAsAdmin} from '../../lib/users';

Meteor.publish('profile', function() {
  return runAsAdmin(this.userId, accountProfile.find());
});

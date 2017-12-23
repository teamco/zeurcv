import {runAsAdmin} from '../../lib/users';
import {accountProfile} from '../../model/accountProfile.model';

Meteor.publish('users', function() {
  return runAsAdmin(this.userId, Meteor.users.find());
});

Meteor.publish('profile', function() {
  return runAsAdmin(this.userId, accountProfile.find());
});

Meteor.publish('userStatus', function() {
  return runAsAdmin(this.userId, Meteor.users.find({'status.online': true}));
});

Meteor.publish('roles', function() {
  return runAsAdmin(this.userId, Meteor.roles.find());
});
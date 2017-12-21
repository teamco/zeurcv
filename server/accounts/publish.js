import {runAsAdmin} from '../../lib/utils';

Meteor.publish('users', function() {
  return runAsAdmin(this.userId, Meteor.users.find());
});

Meteor.publish('userStatus', function() {
  return runAsAdmin(this.userId, Meteor.users.find({'status.online': true}));
});

Meteor.publish('roles', function() {
  return runAsAdmin(this.userId, Meteor.roles.find());
});
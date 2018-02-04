import {runAsAdmin} from '../../lib/users';
import {templates} from '../../model/templates.model';

Meteor.publish('templates', function() {
  return runAsAdmin(this.userId, templates.find());
});
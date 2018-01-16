import {runAsAdmin} from '../../lib/users';
import {settingAction} from '../../model/settingAction.model';

if (!settingAction.find().count()) {
  const createdAt = new Date();
  const updatedAt = new Date();
  settingAction.insert({
    label: 'Show notifications',
    checked: true,
    createdAt: createdAt,
    updatedAt: updatedAt
  });
  settingAction.insert({
    label: 'Enable history',
    checked: false,
    createdAt: createdAt,
    updatedAt: updatedAt
  });
}

Meteor.publish('settingActions', function() {
  return runAsAdmin(this.userId, settingAction.find());
});
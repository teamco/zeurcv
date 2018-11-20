import {currentUser, isAdmin, isCurrentUser, usersCollection} from '../../../../lib/users';
import {logsUser, throwError} from '../../../../lib/logs';
import {subscribe} from '../../template';
import {userPages} from '../../../../model/users.model';

/**
 * @constant HEADS
 * @type {string[]}
 */
export const HEADS = ['Name', 'Email', 'Provider', 'Last login', 'Actions'];

/**
 * @method _templateConfig
 * @private
 */
function _templateConfig() {
  subscribe(this, ['users', 'userStatus', 'roles'], () => {
    const user = logsUser();
    let filters = {filters: {userId: (user || {})._id}};
    if (isAdmin()) {
      filters = {};
    }
    if (user && user._id) {
      userPages.set(filters);
    }
  });
  userPages.requestPage(1);
}

Template.usersData.events({
  'click a.delete-user': function(event, template) {
    event.preventDefault();
    const user = this,
        name = user.profile.name || user.profile.email;

    BootstrapModalPrompt.prompt({
      title: TAPi18n.__('user_delete'),
      content: TAPi18n.__('confirm_user_delete', name)
    }, confirmed => {
      if (confirmed) {

        if (isCurrentUser(user._id)) {
          Meteor.logout();
        }

        Meteor.call('destroyUser', user, function(error, result) {
              if (throwError(error)) {
                return false;
              }
              Bert.alert(TAPi18n.__('user_deleted', name), 'info');
            }
        );
      }
    });
  }
});

Template.usersData.onRendered(_templateConfig);
Template.usersDataItem.onRendered(_templateConfig);

Template.usersData.helpers({
  getHeads: HEADS,
  usersCount: () => isAdmin() ? usersCollection().count() : 1
});

Template.usersDataItem.helpers({
  allUsers: () => isAdmin() ? usersCollection().fetch() : [currentUser()],
  labelClass: _id => {
    const status = usersCollection(_id).status;
    let style = 'label-default';
    if (status && status.idle) style = 'label-warning';
    if (status && status.online) style = 'label-success';
    return style;
  },
  isCurrentUser: isCurrentUser
});
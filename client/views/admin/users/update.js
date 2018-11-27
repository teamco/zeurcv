import {throwError} from '../../../../lib/logs';
import {getUser} from '../../../../lib/users';

function _filterValueByType(input, type) {

  type = type || input.type;

  switch (type) {
    case 'date':
      return new Date(input.value);
    case 'checkbox':
      return input.checked;
    default:
      return input.value;
  }
}

function _collectData($elements) {

  let data = {};

  _.each($elements, input => {
    data[input.name] = _filterValueByType(input, input.dataset.type);
  });

  return data;
}

Template.editUser.events({

  'click a[data-type="update-user"]': function(event) {

    event.preventDefault();

    const $profile = $('#profile').find('input:enabled, textarea:enabled, select:enabled'),
        $access = $('#access').find('input:enabled'),
        profile = _collectData($profile),
        access = _collectData($access);

    const userId = getUser()._id;

    Meteor.call(
        'updateUser', {
          userId: userId,
          profile: profile,
          access: access
        },
        function(error, user) {

          if (throwError(error)) {
            return false;
          }

          Bert.alert(
              TAPi18n.__('user_updated', user.profile.email),
              'info'
          );

          //Router.go('/setting/users');
        }
    );
  }
});
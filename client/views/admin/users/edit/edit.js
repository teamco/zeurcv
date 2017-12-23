import {getUser, getUserProfile, getUserRoles, getUserName} from '../../../../../lib/users';
import {subscribe} from '../../../template';

Template.editUser.onCreated(() => subscribe(['users', 'userStatus', 'profile', 'roles']));

Template.editUser.onRendered(function() {
  this.$('.datetimepicker').datetimepicker({
    format: 'MMMM DD, YYYY'
  });
});

Template.editUser.helpers({
  info: function() {
    return {
      _id: function() {
        return getUser()._id;
      },
      email: function() {
        return getUser().profile.email;
      },
      provider: function() {
        return getUser().profile.provider;
      },
      profile: function() {
        return getUser().profile.link;
      },
      createdAt: function() {
        return getUser().createdAt;
      }
    };
  },
  status: function() {
    const status = getUser().status || {lastLogin:{}};
    return {
      idle: function() {
        return status.idle ? 'Idle' : 'Active';
      },
      online: function() {
        return status.online ? 'Online' : 'Offline';
      },
      ipAddress: function() {
        return status.lastLogin.ipAddr;
      },
      userAgent: function() {
        return status.lastLogin.userAgent;
      },
      lastLogin: function() {
        return status.lastLogin.date;
      }
    };
  },
  profile: function() {
    return {
      firstName: function() {
        return getUserProfile().userFirstName || getUserName().split(' ')[0];
      },
      middleName: function() {
        return getUserProfile().userMiddleName;
      },
      lastName: function() {
        return getUserProfile().userLastName || getUserName().split(' ')[1];
      },
      birthday: function() {
        return getUserProfile().userBirthday;
      },
      country: function() {
        return getUserProfile().userCountry;
      },
      address: function() {
        return getUserProfile().userAddress;
      }
    };
  },
  access: function() {

    var roles = getUserRoles();

    return {
      availableRoles: function() {
        return _.map(Roles.getAllRoles().fetch(), function(role) {
          return {
            name: role.name,
            checked: _.contains(roles, role.name)
          };
        });
      },
      currentRoles: function() {
        return roles.join(', ');
      }
    };
  }
});
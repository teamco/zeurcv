import {getUser, getUserProfile, getUserRoles, getUserName} from '../../../../../lib/users';
import {subscribe} from '../../../template';

Template.editUser.onCreated(() => subscribe(['users', 'userStatus', 'profile', 'roles']));

Template.editUser.onRendered(() => {
  this.$('.datetimepicker').datetimepicker({
    format: 'MMMM DD, YYYY'
  });
});

Template.editUser.helpers({
  info: () => ({
    _id: () => getUser()._id,
    email: () => getUser().profile.email,
    provider: () => getUser().profile.provider,
    profile: () => getUser().profile.link,
    createdAt: () => getUser().createdAt
  }),
  status: () => {
    const status = getUser().status || {lastLogin: {}};
    return {
      idle: () => status.idle ? 'Idle' : 'Active',
      online: () => status.online ? 'Online' : 'Offline',
      ipAddress: () => status.lastLogin.ipAddr,
      userAgent: () => status.lastLogin.userAgent,
      lastLogin: () => status.lastLogin.date
    };
  },
  profile: () => ({
    firstName: () => getUserProfile().userFirstName || getUserName().split(' ')[0],
    middleName: () => getUserProfile().userMiddleName,
    lastName: () => getUserProfile().userLastName || getUserName().split(' ')[1],
    birthday: () => getUserProfile().userBirthday,
    country: () => getUserProfile().userCountry,
    address: () => getUserProfile().userAddress
  }),
  access: () => {
    const roles = getUserRoles();
    return {
      availableRoles: () => _.map(Roles.getAllRoles().fetch(), role => ({
        name: role.name,
        checked: _.contains(roles, role.name)
      })),
      currentRoles: () => roles.join(', ')
    };
  }
});
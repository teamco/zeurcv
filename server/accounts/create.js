import {googleProfile} from './_providers/google';

const admins = ['teamco@gmail.com'];
const managers = [];

/**
 * @method _inRole
 * @param role
 * @param email
 * @returns {boolean}
 * @private
 */
function _inRole(role, email) {
  return role.indexOf(email) > -1;
}

/**
 * @method _defineRoles
 * @param user
 * @param {Array} roles
 * @private
 */
function _defineRoles(user, roles) {
  if (user._id) {
    Meteor.defer(() => Roles.addUsersToRoles(user._id, roles));
  }
}

/**
 * @method _getProviderInfo
 * @param provider
 * @param user
 * @returns {{}}
 * @private
 */
function _getProviderInfo(provider, user) {
  let opts = {};
  const info = user.services[provider];
  switch (provider) {
    case 'facebook':
      opts = {
        email: info.email,
        picture: 'http://graph.facebook.com/' + info.id + '/picture/?type=small',
        link: info.link
      };
      break;
    case 'github':
      opts = {
        email: info.email,
        link: ''
      };
      break;
    case 'google':
      opts = googleProfile(user, info);
      break;
    case 'twitter':
      opts = {
        email: info.screenName,
        link: ''
      };
      break;
    default:
      opts = {
        email: user.emails[0].address,
        link: '/users/' + user._id
      };
      break;
  }
  if (!opts.picture) {
    opts.picture = Gravatar.imageUrl(opts.email, {});
  }
  return opts;
}

Accounts.onCreateUser((options, user) => {
  const provider = Object.keys(user.services).shift() || '',
      auth = _getProviderInfo(provider, user);

  options = options || {};
  options.profile = options.profile || {};
  options.profile.picture = auth.picture;
  options.profile.provider = provider;
  options.profile.email = auth.email;
  options.profile.link = auth.link;
  options.profile.updatedAt = user.createdAt;
  user.profile = options.profile;

  if (_inRole(admins, auth.email)) _defineRoles(user, ['admin']);
  else if (_inRole(managers, auth.email)) _defineRoles(user, ['manager']);
  else _defineRoles(user, ['end-user']);

  return user;
});
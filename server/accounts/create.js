import {googleProfile} from './_providers/google';
import {facebookProfile} from './_providers/facebook';
import {linkedinProfile} from './_providers/linkedin';

/**
 * @constant providersInfo
 * @type {{google: googleProfile, facebook: facebookProfile, linkedin: linkedinProfile}}
 */
const providersInfo = {
  google: googleProfile,
  facebook: facebookProfile,
  linkedin: linkedinProfile
};

const admins = ['teamco@gmail.com', 'pavel.sheinfeld@gmail.com'];
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
  const opts = providersInfo[provider](user, user.services[provider]);
  if (!opts.picture) {
    opts.picture = Gravatar.imageUrl(opts.email, {});
  }
  return opts;
}

/**
 * @method _handleLinkedInOpts
 * @param opts
 * @returns {*}
 * @private
 */
function _handleLinkedInOpts(opts) {
  if (opts.profile.provider === 'linkedin') {
    if (!opts.profile.name) {
      opts.profile.name = [
        opts.profile.firstName,
        opts.profile.lastName
      ].join(' ');
    }
  }
  return opts;
}

Accounts.onLogin(() => {
  // TODO
});

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

  options = _handleLinkedInOpts(options);

  user.profile = options.profile;

  if (_inRole(admins, auth.email)) _defineRoles(user, ['admin']);
  else if (_inRole(managers, auth.email)) _defineRoles(user, ['manager']);
  else _defineRoles(user, ['end-user']);

  return user;
});
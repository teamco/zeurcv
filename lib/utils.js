// import {accountProfile} from '../model/accountProfile.model';

/**
 * @method getParamId
 * @param type
 */
export const getParamId = type => FlowRouter.current().params[type];

/**
 * @method isSingularized
 * @param str
 */
export const isSingularized = (str) => pluralize(str, 1) === str;

/**
 * @method modelName
 */
export const modelName = () => FlowRouter.current().route.name;

/**
 * @method pageTitle
 */
export const pageTitle = () => s.humanize(modelName());

/**
 * @method templateName
 */
export const templateName = () => s.camelize(pluralize(pageTitle(), 2).toLowerCase());

/**
 * @method runTemplateHelper
 * @param template
 * @param method
 */
export const runTemplateHelper = (template, method) => template.__helpers.get(method).call();

/**
 * @method inRole
 * @param role
 * @param userId
 * @returns {*}
 */
export const inRole = (role, userId) => {
  if (Meteor.isClient) {
    userId = userId || Meteor.userId();
  }
  return currentUser() && Roles.userIsInRole(userId, role);
};

/**
 * @method isAdmin
 * @param userId
 */
export const isAdmin = userId => inRole('admin', userId);

/**
 * @method isCurrentUser
 * @param userId
 * @returns {boolean}
 */
export const isCurrentUser = userId => {
  if (Meteor.isClient) {
    return userId === Meteor.userId();
  }
};

/**
 * @method currentUser
 * @returns {boolean}
 */
export const currentUser = () => Meteor.isServer ? true : Meteor.user();

/**
 * @method runAsAdmin
 * @param userId
 * @param filter
 * @returns {*}
 */
export const runAsAdmin = (userId, filter) => {
  if (isAdmin(userId)) {
    return filter;
  }
};

/**
 * @method getUser
 * @param userId
 * @returns {Promise|any|{profile: {}, status: {lastLogin: {}}}}
 */
export const getUser = userId => Accounts.users.findOne(userId || getParamId('userId')) ||
    {profile: {}, status: {lastLogin: {}}};

/**
 * @method getUserRoles
 * @param userId
 */
export const getUserRoles = userId => Roles.getRolesForUser(getUser(userId)) || [];

/**
 * @method getUserProfile
 * @param userId
 * @returns {{}}
 */
export const getUserProfile = userId => (accountProfile.findOne({userId: getUser(userId)._id}) || {}).profile || {};

/**
 * @method getUserName
 * @param userId
 * @returns {string}
 */
export const getUserName = userId => getUser(userId).profile.name || ' ';

/**
 * @method isUserLogs
 * @returns {*}
 */
export const isUserLogs = function() {
  FlowRouter.watchPathChange();
  const userId = getParamId('userId');
  return userId ? getUser(userId) : getUser();
};

/**
 * @method is403
 * @param id
 * @param url
 */
export const is403 = (id, url) => {
  const name = Meteor.isClient ? Template.instance().view.name : 'Meteor.server';
  throwError({
    error: 403,
    errorType: TAPi18n.__('find_error', name),
    reason: name,
    message: TAPi18n.__('find_error', name),
    stack: 'Invalid Id: ' + id
  });
  FlowRouter.go(url || '/');
};

/**
 * @method throwError
 * @param errorClass
 * @returns {*}
 */
export const throwError = errorClass => {

  /**
   * @method _call
   * @returns {Meteor.Error}
   * @private
   */
  function _call() {
    Meteor.call(
        'createErrorLog', {
          details: errorClass.details,
          error: errorClass.error,
          errorType: errorClass.errorType,
          message: errorClass.message,
          reason: errorClass.reason,
          stack: errorClass.stack
        },
        (error, result) => {
          if (error) {
            console.error(error, result);
          }
        }
    );

    return new Meteor.Error(errorClass.error, errorClass.reason, errorClass.details);
  }

  if (Meteor.isClient && errorClass) {
    Bert.alert(errorClass.message, 'danger');
    return _call();
  }

  if (Meteor.isServer && errorClass) throw _call();

  return false;
};
import {accountProfile} from '../model/accountProfile.model';
import {getParamId} from './utils';

/**
 * @method inRole
 * @param role
 * @param [userId]
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
 * @param [userId]
 * @returns {boolean}
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
 * @returns {*}
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
 * @param {string} [userId]
 * @returns {Promise|any|{profile: {}, status: {lastLogin: {}}}}
 */
export const getUser = userId => {
  const empty = {profile: {}, status: {lastLogin: {}}};
  userId = userId || getParamId('userId');
  return (userId ? usersCollection(userId) : currentUser()) || empty;
};

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
 * @method usersCollection
 * @param {string} [userId]
 * @returns {Mongo.Cursor}
 */
export const usersCollection = userId => userId ? Accounts.users.findOne(userId) : Accounts.users.find();

const localLogin = false;

/**
 * @method isLoggedIn
 * @return {boolean}
 */
export const isLoggedIn = () => {
  return localLogin || !!Meteor.userId();
};
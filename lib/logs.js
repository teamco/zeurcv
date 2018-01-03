import {getParamId} from './utils';
import {getUser} from './users';
import {userLog} from '../model/userLog.model';
import {errorLog} from '../model/errorLog.model';

/**
 * @instance sharedMethods
 * @type {{logOwnerEmail: (function(*=)), logId: (function(): (sharedMethods.logId|(function()))), userLog: (function(): {httpHeaders: {}}), isError: sharedMethods.isError}}
 */
export const sharedMethods = {
  logOwnerEmail: userId => getUser(userId).profile.email,
  logId: () => FlowRouter.current().params.logId,
  userLog: () => userLog.find(sharedMethods.logId()).fetch()[0] || {httpHeaders: {}},
  isError: logId => errorLog.findOne({userLogId: sharedMethods.logId() || logId})
};

/**
 * @method logsUser
 * @returns {*}
 */
export const logsUser = () => {
  FlowRouter.watchPathChange();
  const userId = getParamId('userId');
  return userId ? getUser(userId) : getUser();
};

/**
 * @method is403
 * @param {string} [id]
 * @param {string} [url]
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
    Meteor.call('createErrorLog', {
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
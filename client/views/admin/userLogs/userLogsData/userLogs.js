import {logsUser} from '../../../../../lib/logs';
import {userLog} from '../../../../../model/userLog.model';
import {userLogPages} from '../../../../../model/userLog.model';
import {sharedMethods} from '../../../../../lib/logs';
import {subscribe} from '../../../template';
import {userPages} from '../../../../../model/users.model';

/**
 * @constant HEADS
 * @type {[string,string,string,string]}
 */
export const HEADS = ['User action', 'IP', 'Created at', 'Show'];

/**
 * @method _configTemplate
 * @private
 */
export const _configTemplate = function() {
  subscribe(this, ['users', 'userStatus', 'roles', 'userLogs', 'errorLogs'], () => {
    const user = logsUser();
    if (user && user._id) {
      userLogPages.set({filters: {userId: user._id}});
    }
  });
  userLogPages.requestPage(1);
};

Template.userLogsData.onRendered(_configTemplate);

Template.userLogsData.helpers({

  /**
   * @method userLogsCount
   * @returns {number}
   */
  userLogsCount: () => {
    const user = logsUser();
    return user && user._id ? userLog.find({userId: user._id}).count() : 0;
  },

  getHeads: HEADS,
  isError: sharedMethods.isError
});

Template.userLogsDataItem.helpers({
  style: function() {
    return sharedMethods.isError(this._id) ? 'danger' : 'info';
  },
  logOwnerEmail: sharedMethods.logOwnerEmail,
  isError: sharedMethods.isError
});
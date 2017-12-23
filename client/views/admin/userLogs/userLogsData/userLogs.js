import {runTemplateHelper} from '../../../../../lib/utils';
import {logsUser, getUser} from '../../../../../lib/users';
import {subscribe} from '../../../template';
import {userLog} from '../../../../../model/userLog.model';
import {userLogPages} from '../../../../../model/userLog.model';
import {sharedMethods} from '../../../../../lib/logs'

/**
 * @constant HEADS
 * @type {[string,string,string,string]}
 */
export const HEADS = ['User action', 'IP', 'Created at', 'Show'];

Template.userLogsData.onCreated(() => {
  subscribe(['users', 'userLogs', 'errorLogs']);
  const user = logsUser();
  if (user && user._id) {
    userLogPages.set({
      filters: {
        userId: user._id
      }
    });
  }
});

Template.userLogsData.helpers({

  /**
   * @method userLogsCount
   * @returns {any}
   */
  userLogsCount: () => {
    const user = logsUser();
    return user ?
        userLog.find({userId: user._id}).count() :
        userLog.find().count();
  },

  getHeads: HEADS,
  isError: sharedMethods.isError
});

Template.userLogsDataItem.onCreated(() => subscribe(['users', 'userLogs', 'errorLogs']));

Template.userLogsDataItem.helpers({
  style: function() {
    return sharedMethods.isError(this._id) ? 'danger' : 'info';
  },
  logOwnerEmail: sharedMethods.logOwnerEmail,
  isError: sharedMethods.isError
});
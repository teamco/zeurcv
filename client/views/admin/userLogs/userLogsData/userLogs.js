import {logsUser} from '../../../../../lib/logs';
import {userLog} from '../../../../../model/userLog.model';
import {userLogPages} from '../../../../../model/userLog.model';
import {sharedMethods} from '../../../../../lib/logs';

/**
 * @constant HEADS
 * @type {[string,string,string,string]}
 */
export const HEADS = ['User action', 'IP', 'Created at', 'Show'];

Template.userLogsData.onCreated(() => {
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
   * @returns {number}
   */
  userLogsCount: () => {
    const user = logsUser();
    return user && user._id ?
        userLog.find({userId: user._id}).count() :
        userLog.find().count();
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
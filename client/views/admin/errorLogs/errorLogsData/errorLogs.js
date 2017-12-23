import {logsUser} from '../../../../../lib/logs';
import {subscribe} from '../../../template';
import {userLog} from '../../../../../model/userLog.model';
import {errorLog} from '../../../../../model/errorLog.model';
import {errorLogPages} from '../../../../../model/errorLog.model';
import {isAdmin} from '../../../../../lib/users';

/**
 * @constant HEADS
 * @type {[string,string,string,string,string]}
 */
export const HEADS = ['Error', 'Type', 'Reason', 'Updated at', 'Show'];

/**
 * @method _style
 * @param fixed
 * @returns {string}
 * @private
 */
function _style(fixed) {
  return fixed ? 'success' : 'danger';
}

/**
 * @method _filterByUser
 * @param user
 * @returns {Array}
 * @private
 */
function _filterByUser(user) {
  return _.map(userLog.find({userId: user._id}).fetch(), log => log._id);
}

Template.errorLogsData.onCreated(function() {
  const user = logsUser();
  if (user && user._id) {
    errorLogPages.set({
      filters: {
        userLogId: {
          $in: _filterByUser(user)
        }
      }
    });
  }
});

Template.errorLogsData.helpers({
  getHeads: HEADS,

  /**
   * @method errorLogsCount
   * @returns {number}
   */
  errorLogsCount: () => {
    const user = logsUser();
    if (user && user._id) {
      return errorLog.find({
        userLogId: {$in: _filterByUser(user)}
      }).count();
    }

    return 0;
  }
});

Template.errorLogsDataItem.helpers({
  style: _style
});
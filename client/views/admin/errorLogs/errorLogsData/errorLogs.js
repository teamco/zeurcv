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
 */
export const style = (fixed) => fixed ? 'success' : 'danger';

/**
 * @method _filterByUser
 * @param user
 * @returns {Array}
 */
export const filterByUser = (user) => _.map(userLog.find({userId: user._id}).fetch(), log => log._id);

/**
 * @method paginateErrors
 */
export const paginateErrors = () => {
  const user = logsUser();
  if (user && user._id) {
    errorLogPages.set({
      filters: {
        userLogId: {
          $in: filterByUser(user)
        }
      }
    });
  }
};

Template.errorLogsData.onRendered(function() {
  subscribe(this, ['users', 'userLogs', 'errorLogs'], paginateErrors);
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
        userLogId: {$in: filterByUser(user)}
      }).count();
    }

    return 0;
  }
});

Template.errorLogsDataItem.helpers({
  style: style
});
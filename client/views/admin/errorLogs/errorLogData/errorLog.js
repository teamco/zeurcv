import {errorLog} from '../../../../../model/errorLog.model';
import {logsUser} from '../../../../../lib/logs';
import {is403, throwError} from '../../../../../lib/logs';
import {HEADS, paginateErrors, filterByUser, style} from '../errorLogsData/errorLogs';
import {subscribe} from '../../../template';
import {getParamId} from '../../../../../lib/utils';

/**
 * @instance errorData
 */
let errorData;

/**
 * @method _getErrorData
 * @param errorId
 * @returns {any | Promise | *}
 * @private
 */
function _getErrorData(errorId) {

  const user = logsUser();
  let failed = '/dashboard/errors';

  errorId = errorId || getParamId('errorId');

  if (errorData && errorData._id === errorId) {
    return errorData;
  }

  if (user && user._id) {
    errorData = errorLog.findOne({
      _id: errorId,
      userLogId: {$in: filterByUser(user)}
    });

    if (!errorData) {
      failed = '/dashboard/users/' + user._id + '/errors';
    }
  } else {
    errorData = errorLog.findOne(errorId);
  }

  if (errorData) {
    return errorData;
  }

  return is403(errorId, failed);
}

Template.errorLogData.events({
  'click a[data-type="error"]': function(event) {

    event.preventDefault();

    const errorId = getParamId('errorId'),
        log = errorLog.findOne(errorId);

    if (log.fixed) {
      Bert.alert(TAPi18n.__('error_already_fixed'), 'warning');
      return false;
    }

    Meteor.call(
        'updateErrorLog', {
          errorId: errorId
        },
        function(error, result) {
          if (throwError(error)) {
            return false;
          }
          Bert.alert(TAPi18n.__('error_fixed'), 'info');
          //Router.go('/dashboard/errors');
        }
    );
  }
});

Template.errorLogData.onRendered(function() {
  subscribe(this, ['users', 'userLogs', 'errorLogs'], paginateErrors);
});

Template.errorLogData.helpers({
  getHeads: HEADS,
  style: style,
  errorLog: _getErrorData
});
import {userLog} from '../../../../../model/userLog.model';
import {errorLog} from '../../../../../model/errorLog.model';
import {errorLogPages} from '../../../../../model/errorLog.model';
import {logsUser} from '../../../../../lib/logs';
import {is403} from '../../../../../lib/logs';
import {HEADS} from '../errorLogsData/errorLogs'

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
  return _.map(
      userLog.find({userId: user._id}).fetch(),
      function(log) {
        return log._id;
      }
  );
}

/**
 * @method _getErrorData
 * @param errorId
 * @returns {any | Promise | *}
 * @private
 */
function _getErrorData(errorId) {
  const user = logsUser();
  let failed = '/dashboard/errors';
  let error;

  errorId = errorId || FlowRouter.current().params.errorId;

  if (user && user._id) {
    error = errorLog.findOne({
      _id: errorId,
      userLogId: {
        $in: _filterByUser(user)
      }
    });

    if (!error) {
      failed = '/dashboard/users/' + user._id + '/errors';
    }
  } else {
    error = errorLog.findOne(errorId);
  }

  if (error) {
    return error;
  }

  return is403(errorId, failed);
}

Template.errorLogData.events({
  'click a[data-type="error"]': function(event) {

    event.preventDefault();

    // var errorId = Router.current().params.errorId,
    //     errorLog = ErrorLog.findOne(errorId);

    if (errorLog.fixed) {
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

Template.errorLogData.helpers({
  getHeads: HEADS,
  style: _style,
  errorLog: _getErrorData
});
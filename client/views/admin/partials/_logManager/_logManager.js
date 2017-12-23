import {subscribe} from '../../../template';
import {logsUser} from '../../../../../lib/logs';

/**
 * @method _logUrl
 * @param {string} path
 * @private
 */
function _logUrl(path) {
  const user = logsUser();
  return user ? ('users/' + user._id + path) : path;
}

Template.logManager.helpers({

  /**
   * @method userLogsUrl
   */
  userLogsUrl: () => _logUrl('logs'),

  /**
   * @method errorLogsUrl
   */
  errorLogsUrl: () => _logUrl('errors')
});

Template.logManager.onCreated(() => subscribe(['users', 'userStatus', 'userLogs', 'errorLogs']));


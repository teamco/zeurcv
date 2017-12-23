import {logsUser} from '../../../../../lib/logs';
import {runTemplateHelper} from '../../../../../lib/utils';

/**
 * @method _logUrl
 * @param {string} path
 * @private
 */
function _logUrl(path) {
  const user = logsUser();
  return user && user._id ? ('users/' + user._id + path) : path;
}

Template.logManager.helpers({

  /**
   * @method userLogsCount
   * @returns {number}
   */
  userLogsCount: () => runTemplateHelper(Template.userLogsData, 'userLogsCount'),

  /**
   * @method errorLogsCount
   * @returns {number}
   */
  errorLogsCount: () => runTemplateHelper(Template.errorLogsData, 'errorLogsCount'),

  /**
   * @method userLogsUrl
   * @returns {string}
   */
  userLogsUrl: () => _logUrl('/logs'),

  /**
   * @method errorLogsUrl
   * @returns {string}
   */
  errorLogsUrl: () => _logUrl('/errors')
});
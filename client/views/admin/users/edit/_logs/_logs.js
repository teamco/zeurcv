import {runTemplateHelper} from '../../../../../../lib/utils';
import {subscribe} from '../../../../template';

Template.editUserLogs.onRendered(function() {
  subscribe(this, ['userLogs', 'errorLogs']);
});

Template.editUserLogs.helpers({

  /**
   * @method userLogsCount
   * @returns {number}
   */
  userLogsCount: () => runTemplateHelper(Template.logManager, 'userLogsCount'),

  /**
   * @method errorLogsCount
   * @returns {number}
   */
  errorLogsCount: () => runTemplateHelper(Template.logManager, 'errorLogsCount'),

  /**
   * @method userLogsUrl
   * @returns {string}
   */
  userLogsUrl: () => runTemplateHelper(Template.logManager, 'userLogsUrl'),

  /**
   * @method errorLogsUrl
   * @returns {string}
   */
  errorLogsUrl: () => runTemplateHelper(Template.logManager, 'errorLogsUrl')
});
import {HEADS, _configTemplate} from '../userLogsData/userLogs';
import {sharedMethods} from '../../../../../lib/logs';

Template.userLogData.helpers({
  getHeads: HEADS,
  logOwnerEmail: sharedMethods.logOwnerEmail,
  isError: sharedMethods.isError,
  userLog: () => sharedMethods.userLog(),
  acceptLanguage: () => sharedMethods.userLog().httpHeaders['accept-language'],
  userAgent: () => sharedMethods.userLog().httpHeaders['user-agent'],
  xForwardedFor: () => sharedMethods.userLog().httpHeaders['x-forwarded-for']
});

Template.userLogData.onRendered(_configTemplate);
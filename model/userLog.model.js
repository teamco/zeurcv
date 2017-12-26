import {allowModel} from './methods';

/**
 * @instance userLog
 * @type {Mongo.Collection}
 */
export const userLog = allowModel(new Mongo.Collection('user_log'));

/**
 * @instance userLogPages
 * @type {Meteor.Pagination}
 */
export const userLogPages = new Meteor.Pagination(userLog, {
  templateName: 'userLogsData',
  itemTemplate: 'userLogsDataItem',
  perPage: 10,
  divWrapper: false,
  sort: {
    createdAt: -1
  },
  availableSettings: {
    perPage: true,
    sort: true,
    filters: true
  }
});
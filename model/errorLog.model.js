import {allowModel} from './methods';

/**
 * @instance errorLog
 * @type {Mongo.Collection}
 */
export const errorLog = new Mongo.Collection('error_log');

/**
 * @instance errorLogPages
 * @type {Meteor.Pagination}
 */
export const errorLogPages = new Meteor.Pagination(errorLog, {
  templateName: 'errorLogsData',
  itemTemplate: 'errorLogsDataItem',
  perPage: 10,
  divWrapper: false,
  sort: {
    updatedAt: -1
  },
  availableSettings: {
    filters: true
  }
});

allowModel(errorLog);
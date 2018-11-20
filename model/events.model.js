import {allowModel} from './methods';

/**
 * @instance events
 * @type {Mongo.Collection}
 */
export const events = allowModel(new Mongo.Collection('events'));

/**
 * @instance eventPages
 * @type {Meteor.Pagination}
 */
export const eventPages = new Meteor.Pagination(events, {
  templateName: 'eventsData',
  itemTemplate: 'eventsDataItem',
  perPage: 10,
  divWrapper: false,
  sort: {
    updatedAt: -1
  },
  availableSettings: {
    perPage: true,
    sort: true,
    filters: true
  }
});
import {events} from './events.model';

/**
 * @instance eventPages
 * @type {Meteor.Pagination}
 */
export const subscriptionsPages = new Meteor.Pagination(events, {
  templateName: 'subscriptionsData',
  itemTemplate: 'subscriptionsDataItem',
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
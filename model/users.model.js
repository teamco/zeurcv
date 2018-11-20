import {allowModel} from './methods';

/**
 * @instance userPages
 * @type {Meteor.Pagination}
 */
export const userPages = new Meteor.Pagination(Accounts.users, {
  templateName: 'usersData',
  itemTemplate: 'usersDataItem',
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

allowModel(Meteor.users);
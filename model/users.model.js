import {allowModel} from './methods';

/**
 * @instance userLogPages
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
    filters: true
  }
});
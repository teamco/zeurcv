import {allowModel} from './methods';
import {denyModel} from './methods';

/**
 * @instance accountProfile
 * @type {Mongo.Collection}
 */
export const accountProfile = allowModel(denyModel(new Mongo.Collection('account_profile')));

/**
 * @instance accountProfilePages
 * @type {Meteor.Pagination}
 */
export const accountProfilePages = new Meteor.Pagination(accountProfile, {
  templateName: 'accountProfilesData',
  itemTemplate: 'accountProfilesDataItem',
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
import {allowModel} from './methods';

/**
 * @instance settingAction
 * @type {Mongo.Collection}
 */
export const settingAction = allowModel(new Mongo.Collection('setting_actions'));

/**
 * @instance settingActionPages
 * @type {Meteor.Pagination}
 */
export const settingActionPages = new Meteor.Pagination(settingAction, {
  templateName: 'settingActionsData',
  itemTemplate: 'settingActionsDataItem',
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
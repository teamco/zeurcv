import {getUser} from '../../../../../lib/users';
import {subscribe} from '../../../template';
import {settingAction, settingActionPages} from '../../../../../model/settingAction.model';

/**
 * @constant HEADS
 * @type {[string, string]}
 */
export const HEADS = ['Name', 'Actions'];

/**
 * @method paginateSettingActions
 */
export const paginateSettingActions = () => {
  // const user = getUser();
  // if (user && user._id) {
  //   settingActionPages.set({filters: {userId: user._id}});
  // } else {
  // settingActionPages.set({filters: {}});
  // }
};

Template.settingActionsData.onRendered(function() {
  subscribe(this, ['users', 'settingActions'], paginateSettingActions);
});

Template.settingActionsData.helpers({
  getHeads: HEADS,

  /**
   * @method isOn
   * @param _id
   * @return {string}
   */
  isOn: _id => {
    const setting = settingAction.find({_id: _id}).fetch();
    return setting.checked ? 'checked="checked"' : '';
  },

  /**
   * @method errorLogsCount
   * @returns {number}
   */
  settingActionsCount: () => {
    return settingAction.find().count();
  }
});
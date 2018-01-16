import {settingAction} from '../../../../../model/settingAction.model';
import {getUser} from '../../../../../lib/users';

Template.rightBarSetting.helpers = ({

  /**
   * Fetch all user setting actions
   * @method userSettingActions
   */
  userSettingActions: () => settingAction.find({userId: getUser()._id})
});
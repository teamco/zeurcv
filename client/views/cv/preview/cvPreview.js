import {configProfileTemplate} from '../accountProfilesData/accountProfiles';
import {accountProfile} from '../../../../model/accountProfile.model';
import {getUser} from '../../../../lib/users';
import {getParamId} from '../../../../lib/utils';

Template.cvPreview.onRendered(configProfileTemplate);

Template.cvPreview.helpers({

  /**
   * @method profile
   * @param id
   * @return {any}
   */
  profile: id => {
    id = id || getParamId('profileId');
    return accountProfile.findOne({userId: getUser()._id, _id: id});
  }
});
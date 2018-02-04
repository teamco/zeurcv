import {configProfileTemplate} from '../accountProfilesData/accountProfiles';
import {accountProfile} from '../../../../model/accountProfile.model';
import {getUser} from '../../../../lib/users';

Template.cvPreview.onRendered(configProfileTemplate);

Template.cvPreview.helpers({
  profile: id => {
    id = id || FlowRouter.current().params.profileId;
    return accountProfile.findOne({userId: getUser()._id, _id: id});
  }
});
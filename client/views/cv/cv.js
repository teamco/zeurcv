import {accountProfile} from '../../../model/accountProfile.model';
import {currentUser} from '../../../lib/users';
import {configProfileTemplate} from './accountProfilesData/accountProfiles';

Template.cv.onRendered(configProfileTemplate);

Template.cv.helpers({

  /**
   * @method showNewButton
   * @param count
   * @return {{boolean}}
   */
  showNewButton: count => !count,

  /**
   * @method profilesCount
   * @returns {number}
   */
  profilesCount: () => {
    const user = currentUser();
    return user && user._id ? accountProfile.find({userId: user._id}).count() : 0;
  }
});
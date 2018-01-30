import {throwError} from '../../../lib/logs';
import {accountProfile} from '../../../model/accountProfile.model';
import {currentUser} from '../../../lib/users';
import {configProfileTemplate} from './accountProfilesData/accountProfiles';

Template.cv.events({

  /**
   * @event click
   * @param e
   * @param data
   */
  'click #fetch-data'(e, data) {

    Meteor.call('fetchUserProfileData', (error, result) => {
      if (throwError(error)) {
        return false;
      }
      Bert.alert(TAPi18n.__('user_data_fetched'), 'info');
      console.log(result);
    });
  }
});

Template.cv.onRendered(configProfileTemplate);

Template.cv.helpers({

  /**
   * @method profilesCount
   * @returns {number}
   */
  profilesCount: () => {
    const user = currentUser();
    return user && user._id ? accountProfile.find({userId: user._id}).count() : 0;
  }
});
import {subscribe} from '../../template';
import {currentUser} from '../../../../lib/users';
import {accountProfilePages} from '../../../../model/accountProfile.model';
import {throwError} from '../../../../lib/logs';

/**
 * @constant HEADS
 * @type {[string,string,string,string,string]}
 */
export const HEADS = ['User', 'Version', 'Headline', 'Updated at', 'Export', 'Action'];

/**
 * @method configTemplate
 */
export const configProfileTemplate = function() {
  subscribe(this, ['users', 'profile'], () => {
    const user = currentUser();
    if (user && user._id) {
      accountProfilePages.set({filters: {userId: user._id}});
    }
  });
};

Template.accountProfilesData.onRendered(configProfileTemplate);

Template.accountProfilesData.helpers({
  getHeads: HEADS
});

Template.accountProfilesData.events({

  /**
   * @event click
   * @param e
   * @param data
   */
  'click #generator-refresh'(e, data) {

    e.preventDefault();

    Meteor.call('fetchUserProfileData', (error, result) => {
      if (throwError(error)) {
        return false;
      }
      Bert.alert(TAPi18n.__('user_data_fetched'), 'info');
      console.log(result);
    });
  }
});

import {throwError} from '../../../lib/logs';

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
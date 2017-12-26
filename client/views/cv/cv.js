import {throwError} from "../../../lib/logs";

Template.cv.helpers({});

Template.cv.events({

    'click#fetch-data'(e, data) {

        Meteor.call('fetchUserProfileData', function (error, result) {
            if (throwError(error)) {
                return false;
            }
            Bert.alert(TAPi18n.__('user_data_fetched'), 'info');
            console.log(result)
        });
    }
});
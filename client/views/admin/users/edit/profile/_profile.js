import {getUserProfile} from '../../../../../../lib/utils';

Template.editUserProfile.helpers({
  selectedCountry: function(country) {
    return getUserProfile().userCountry === country;
  }
});
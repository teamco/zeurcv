import {getUserProfile} from '../../../../../../lib/users';

Template.editUserProfile.helpers({
  selectedCountry: country => getUserProfile().userCountry === country
});
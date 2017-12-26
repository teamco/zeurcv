import {getUserProfile} from '../../../../../../lib/users';
import {subscribe} from '../../../../template';

Template.editUserProfile.onRendered(function() {
  subscribe(this, ['users', 'userStatus', 'roles']);
});

Template.editUserProfile.helpers({
  selectedCountry: country => getUserProfile().userCountry === country
});
import {getUserProfile} from '../../../../../../lib/users';
import {subscribe} from '../../../../template';

Template.editUserProfile.onCreated(() => subscribe(['users', 'userStatus', 'profile', 'roles']));

Template.editUserProfile.helpers({
  selectedCountry: country => getUserProfile().userCountry === country
});
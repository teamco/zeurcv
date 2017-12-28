import {getUser} from '../../../../lib/users';

Template.navigation.onRendered = function() {
  // Initialize metisMenu
  $('#side-menu').metisMenu();
};

Template.navHeader.helpers({

  /**
   * @method getUser
   */
  user: getUser
});

Template.navUserProfile.events({

  'click #sign-out-profile': () => Meteor.logout(() => {
    // TODO (teamco): Do something after logout
  })
});
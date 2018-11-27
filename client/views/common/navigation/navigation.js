import {getUser, isLoggedIn, onAfterLogin} from '../../../../lib/users';

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

Template.navUserProfile.helpers({

  /**
   * On after login do something
   */
  onAfterLogin: onAfterLogin,

  /**
   * Get user image
   * @method userImage
   * @param user
   * @return {*}
   */
  userImage: user => {
    const maxIndex = 2;

    /**
     * Get random index of guest profile image
     * @method index
     */
    const index = Math.floor(Math.random() * maxIndex);

    if (user.profile.picture) {
      return user.profile.picture;
    }

    return '/assets/users/user' + index + '.png';
  },

  /**
   * Get full user name
   * @method userName
   * @param user
   * @return {string}
   */
  userName: user => {
    if (user.profile.name) {
      return user.profile.name;
    }

    return 'Welcome Guest';
  },

  /**
   * @method isLoggedIn
   */
  isLoggedIn: isLoggedIn
});

Template.navUserProfile.events({

  'click #sign-out-profile': () => Meteor.logout(() => {
    // TODO (teamco): Do something after logout
  })
});
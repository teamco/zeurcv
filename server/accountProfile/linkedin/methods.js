import {is403, throwError} from '../../../lib/logs';
import {accountProfile} from '../../../model/accountProfile.model';

Meteor.methods({

  /**
   * @method fetchUserProfileData
   */
  fetchUserProfileData: function() {

    const user = Meteor.user();
    const setting = Meteor.settings.linkedin;
    const Linkedin = require('node-linkedin')(setting.client_id, setting.client_secret);

    if (!user) {
      return is403();
    }

    const provider = user.profile.provider;

    /**
     * @type {{people: {me}}}
     */
    const linkedin = Linkedin.init(user.services[provider].accessToken);
    const bound = Meteor.bindEnvironment(callback => callback());
    linkedin.people.me((error, $in) => bound(() => error ?
        throwError(error) :
        Meteor.call('updateUserProfileData', $in)));
  },

  /**
   * @method createUserProfileData
   * @param $in
   * @param version
   */
  createUserProfileData: function($in, version) {
    $in.updatedAt = new Date();
    $in.createdAt = new Date();
    $in.version = version;
    $in.userId = Meteor.userId();
    accountProfile.insert($in);
  },

  /**
   * @method updateUserProfileData
   * @param $in
   */
  updateUserProfileData: function($in) {
    const profile = accountProfile.findOne(
        {id: $in.id, userId: Meteor.userId()},
        {sort: {updatedAt: -1, limit: 1}}
    );

    if (profile) {

      // Update period: once per 30 days
      const refreshPeriod = 30;
      const currentDate = Date.now();
      const lastUpdate = new Date(profile.updatedAt);
      lastUpdate.setDate(lastUpdate.getDate() + refreshPeriod);

      if (lastUpdate.getTime() < currentDate) {
        // TODO (teamco): Check for changes
        Meteor.call('createUserProfileData', $in, profile.version + 1);
      } else {
        accountProfile.update({_id: $in.id}, {$set: {'updatedAt': new Date()}});
      }
    } else {
      Meteor.call('createUserProfileData', $in, 1);
    }
  }
});
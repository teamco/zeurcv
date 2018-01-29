import {Meteor} from 'meteor/meteor';
import {is403, throwError} from '../../../lib/logs';
import {accountProfile} from '../../../model/accountProfile.model';

Meteor.methods({

  /**
   * @method fetchUserProfileData
   */
  fetchUserProfileData: function() {

    const user = Meteor.user();

    if (!user) {
      return is403();
    }

    const provider = user.profile.provider;

    /**
     * @type {{people: {me}}}
     */
    const linkedin = Linkedin().init(user.services[provider].accessToken);
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
    $in.updated_at = new Date();
    $in.created_at = new Date();
    $in.version = version;
    accountProfile.insert($in);
  },

  /**
   * @method updateUserProfileData
   * @param $in
   */
  updateUserProfileData: function($in) {
    const profile = accountProfile.findOne({id: $in.id}, {sort: {DateTime: -1, limit: 1}});

    if (profile) {

      // Update period: once per 30 days
      const refreshPeriod = 30;
      const currentDate = Date.now();
      const lastUpdate = new Date(profile.updated_at);
      lastUpdate.setDate(lastUpdate.getDate() + refreshPeriod);

      if (lastUpdate.getTime() > currentDate) {
        // TODO (teamco): Check for changes
        Meteor.call('createUserProfileData', $in, profile.version + 1);
      } else {
        accountProfile.update({_id: $in.id}, {$set: {'updated_at': new Date()}}
        );
      }
    } else {
      Meteor.call('createUserProfileData', $in, 1);
    }
  }
});
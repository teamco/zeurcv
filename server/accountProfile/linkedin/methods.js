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

    linkedin.people.me((error, $in) => {
      if (error) {
        return throwError(error);
      }

      const isAvailableProfile = accountProfile.findOne({id: $in.id});

      if (isAvailableProfile) {
        if (isAvailableProfile.createdAt < $in.updatedAt) {
          accountProfile.insert($in);
        } else {
          accountProfile.update(
              {_id: $in.id},
              {$set: {'updated_at': new Date()}},
              {multi: true}
          );
        }
      } else {
        accountProfile.insert($in);
      }
    });
  }
});
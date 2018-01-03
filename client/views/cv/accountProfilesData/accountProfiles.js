import {subscribe} from '../../template';
import {currentUser} from '../../../../lib/users';
import {accountProfile, accountProfilePages} from '../../../../model/accountProfile.model';

/**
 * @constant HEADS
 * @type {[string,string,string,string,string]}
 */
export const HEADS = ['Profile', 'Updated at', 'Show'];

/**
 * @method _configTemplate
 * @private
 */
export const _configTemplate = function() {
  subscribe(this, ['users', 'profile'], () => {
    const user = currentUser();
    if (user && user._id) {
      accountProfilePages.set({filters: {userId: user._id}});
    }
  });
};


Template.accountProfilesData.onRendered(_configTemplate);

Template.accountProfilesData.helpers({
  getHeads: HEADS,

  /**
   * @method profilesCount
   * @returns {number}
   */
  profilesCount: () => {
    const user = currentUser();
    return user && user._id ? accountProfile.find({userId: user._id}).count() : 0;
  }
});
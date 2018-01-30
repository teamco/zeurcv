import {subscribe} from '../../template';
import {currentUser} from '../../../../lib/users';
import {accountProfile, accountProfilePages} from '../../../../model/accountProfile.model';

/**
 * @constant HEADS
 * @type {[string,string,string,string,string]}
 */
export const HEADS = ['User', 'Profile', 'Version', 'Headline', 'Updated at', 'Export to'];

/**
 * @method configTemplate
 */
export const configProfileTemplate = function() {
  subscribe(this, ['users', 'profile'], () => {
    const user = currentUser();
    if (user && user._id) {
      accountProfilePages.set({filters: {userId: user._id}});
    }
  });
};

Template.accountProfilesData.onRendered(configProfileTemplate);

Template.accountProfilesData.helpers({
  getHeads: HEADS
});
import {is403} from '../../lib/logs';
import {loginAccount} from '../vindicia/accounts';

Meteor.methods({

  /**
   * @method updateUser
   * @param opts
   */
  updateUser: opts => {

    if (!Accounts.users.find(opts.userId)) {
      return is403(opts.userId);
    }

    console.info(TAPi18n.__('user_updated_at'));
    Meteor.users.update(
        {_id: opts.userId},
        {$set: {'profile.updatedAt': new Date()}},
        {multi: true}
    );

    const profile = accountProfile.findOne({userId: opts.userId});
    let method = 'create';

    if (profile) {
      method = 'update';
    }

    console.info(TAPi18n.__('account_profile', method));
    Meteor.call(
        method + 'AccountProfile', {
          userId: opts.userId,
          profile: opts.profile
        }
    );

    console.info(TAPi18n.__('user_roles', JSON.stringify(opts.access)));
    Meteor.call('updateAccountRoles', {
      userId: opts.userId,
      access: opts.access
    });

    return Meteor.users.findOne(opts.userId);
  },

  /**
   * @method destroyUser
   * @param user
   * @returns {*}
   */
  destroyUser: function(user) {
    Meteor.users.remove(user._id);
    return user;
  },

  /**
   * @method vindiciaLogin
   * @param user
   */
  vindiciaLogin(user) {
    loginAccount(user.profile.email, (account) => {
      user.vindicia = account;
      Meteor.users.update({_id: user._id}, user);
    });
  }
});
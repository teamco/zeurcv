Template.usersDashboard.helpers({

  /**
   * @method registeredUsers
   */
  registeredUsers: () => Accounts.users.find().count(),

  /**
   * @method onlineUsers
   */
  onlineUsers: () => Accounts.users.find({'status.online': true}).count()
});
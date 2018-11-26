Meteor.methods({

  /**
   * @method getRequestHeaders
   * @returns {*}
   */
  getRequestHeaders() {
    return this.connection;
  }
});
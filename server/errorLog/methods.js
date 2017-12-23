import {errorLog} from '../../model/errorLog.model';
import {userLog} from '../../model/userLog.model';

Meteor.methods({

  /**
   * @method createErrorLog
   * @param error
   */
  createErrorLog: function(error) {

    error.createdAt = new Date();
    error.updatedAt = new Date();

    error.userLogId = (userLog.findOne(
        {userId: this.userId}, {
          sort: {createdAt: -1},
          fields: {userId: 1}
        }
    ) || {})._id;

    errorLog.insert(error);
  },

  /**
   * @method updateErrorLog
   * @param opts
   */
  updateErrorLog: function(opts) {
    errorLog.update(
        {_id: opts.errorId}, {
          $set: {
            updatedAt: new Date(),
            fixedBy: this.userId,
            fixed: 1
          }
        },
        {multi: true}
    );
  }
});
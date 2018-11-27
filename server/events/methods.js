import {events} from '../../model/events.model';
import {comments} from '../../model/comment.model';
import {is404} from '../../lib/logs';
import {audioComments} from '../../model/audioComment.model';
import {errorLog} from '../../model/errorLog.model';
import {products} from '../../model/products.model';
import {settingAction} from '../../model/settingAction.model';
import {userLog} from '../../model/userLog.model';

Meteor.methods({

  /**
   * @method updateEvent
   * @param eventData
   * @returns {*}
   */
  updateEvent(eventData) {
    let event;
    if (eventData._id && eventData._id !== 'new') {
      event = events.findOne({_id: eventData._id});
      if (event) {
        eventData.data.updatedAt = new Date();
        return events.update({_id: eventData._id}, {$set: eventData.data});
      } else {
        is404(eventData._id, '/events');
        return false;
      }
    } else {
      eventData.data.createdAt = new Date();
      eventData.data.updatedAt = new Date();
    }

    return events.findOne({_id: events.insert(eventData.data)});
  },

  /**
   * @param _id
   * @returns {boolean}
   */
  destroyEvent(_id) {
    event = events.findOne({_id: _id});
    if (event) {
      events.remove(event._id);
    } else {
      is404(event._id, '/events');
      return false;
    }
  },
  resetAll() {
    events.remove({});
    comments.remove({});
    accountProfile.remove({});
    audioComments.remove({});
    errorLog.remove({});
    userLog.remove({});
    Meteor.users.remove({});
    products.remove({});
    settingAction.remove({});
    templates.remove({});
  }

});
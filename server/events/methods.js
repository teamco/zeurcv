import {events} from '../../model/events.model';
import {is404} from '../../lib/logs';

Meteor.methods({

  /**
   * @method updateEvent
   * @param data
   * @returns {*}
   */
  updateEvent(data) {
    let event;
    if (data._id) {
      event = events.findOne({_id: data._id});
      if (event) {
        data.updatedAt = new Date();
        return events.update({_id: data._id}, {$set: data});
      } else {
        is404(data._id, '/events');
        return false;
      }
    } else {
      data.createdAt = new Date();
      data.updatedAt = new Date();
    }

    return events.findOne({_id: events.insert(data)});
  },

  destroyEvent(_id) {
    event = events.findOne({_id: _id});
    if (event) {
      events.remove(event._id);
    } else {
      is404(event._id, '/events');
      return false;
    }
  }

});
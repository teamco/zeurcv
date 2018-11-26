import {events} from '../../model/events.model';
import {is404} from '../../lib/logs';

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
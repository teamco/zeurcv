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
    }

    return events.findOne({_id: events.insert(data)});
  },

  destroyEvent(event) {
    //TODO
  }

});
import {events} from '../../../../model/events.model';
import {subscribe} from '../../template';
import {getThumbnail} from '../../../../lib/utils';
import {currentUser, isLoggedIn} from '../../../../lib/users';

Template.commentatorsData.helpers({
  events: () => events.find({}).fetch(),
  embed: _id => {
    const event = events.findOne({_id: _id});
    const url = event.embedCode;
    return getThumbnail(url, 'hq');
  },
  isSubscribed: _id => { //pavel
    const event = events.findOne({_id: _id});
    if ((event.commentators || []).indexOf((currentUser() || {})._id) === -1) {
      return 'Subscribe';
    }
    return 'Unsubscribe';
  },
  viewers: _id => {
    const event = events.findOne({_id: _id});
    return (event.viewers || []).length;
  },
  commentators: _id => {
    const event = events.findOne({_id: _id});
    return (event.commentators || []).length;
  },
  isLoggedIn: isLoggedIn
});

Template.commentatorsData.events({
  'click .subscribe'(e) {
    e.preventDefault();

    const event = events.findOne({_id: this._id});
    if (isLoggedIn()) {
      const id = currentUser()._id;
      if ((event.commentators || []).length) {
        if (event.commentators.indexOf(id) === -1) {
          event.commentators.push(id);
        } else { //pavel
          const index = event.commentators.indexOf(id);
          if (index !== -1) event.commentators.splice(index, 1);
        }
      } else {
        event.commentators = [id];
      }
      events.update({_id: this._id}, {$set: event});
    }
  },
  'click .view'(e) {
    e.preventDefault();
    const event = events.findOne({_id: this._id});

    Meteor.call('getRequestHeaders', {}, (error, result) => {
      if (error) {
        return console.error(error, result);
      }
      const data = JSON.stringify(result);
      if ((event.viewers || []).length) {
        if (event.viewers.indexOf(data) === -1) {
          event.viewers.push(data);
        }
      } else {
        event.viewers = [data];
      }
      events.update({_id: this._id}, {$set: event});
      FlowRouter.go('/sessions/start/' + this._id);
    });
  }
});

Template.commentatorsData.onRendered(async function() {
  subscribe(this, ['events']);
});
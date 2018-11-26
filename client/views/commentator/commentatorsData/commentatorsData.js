import {events} from '../../../../model/events.model';
import {subscribe} from '../../template';
import {currentUser, isLoggedIn} from '../../../../lib/users';

Template.commentatorsData.helpers({
  events: () => events.find({}).fetch(),
  embed: _id => {
    const regex = /https:\/\/www.youtube.com\/watch\?v=/;
    const event = events.findOne({_id: _id});
    const url = event.embedCode;
    const embedCode = url.replace(regex, '');
    const iframe = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${embedCode}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    return iframe;
  },
  isSubscribed: _id => {
    return 'Subscribe';
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
      if ((event.commentators || []).length) {
        const id = currentUser()._id;
        if (event.commentators.indexOf(id) === -1) {
          event.commentators.push(id);
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
    });
  }
});

Template.commentatorsData.onRendered(async function() {
  subscribe(this, ['events']);
});
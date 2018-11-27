import {events} from '../../../model/events.model';
import {comments} from '../../../model/comment.model';
import {embedFrame} from '../../../lib/youtube';
import {getParamId} from '../../../lib/utils';
import {currentUser, isLoggedIn, getUser} from '../../../lib/users';

Template.sessionStart.helpers({
  isLoggedIn: isLoggedIn,
  event: () => {
    const event = events.findOne({_id: getParamId('id')});
    if (!event) {
      return 'Loading...';
    }
    return embedFrame(event.embedCode);
  },
  getComments: () => {
    const id = getParamId('commentatorId');
    if (!id) {
      return false;
    }
    let chunk = comments.find({eventId: getParamId('id'), commentatorId: id}).fetch();

    if (!chunk.length) {
      return 'Comments...';
    }
    return chunk[0].data;
  }
});

Template.sessionStart.events({
  'keyup .send-comment'(e) {
    let chunk = comments.findOne({eventId: getParamId('id'), commentatorId: currentUser()._id});
    if (chunk) {
      chunk.data = chunk.data || '';
      chunk.comments = chunk.comments || [];
      if (e.keyCode === 13) {
        chunk.comments.push(chunk.data);
        chunk.data = '';
        e.target.value = '';
      }
      chunk.data += String.fromCharCode(e.keyCode);
      comments.update({_id: chunk._id}, {$set: chunk});
    } else {
      chunk = {
        comments: [],
        data: String.fromCharCode(e.keyCode),
        eventId: getParamId('id'),
        commentatorId: currentUser()._id
      };
      comments.insert(chunk);
    }
  }
});

Template.commentatorsList.helpers({
  commentators: () => {
    const event = events.findOne({_id: getParamId('id')});
    if (!event) {
      return [];
    }
    return event.commentators.map(user => getUser(user));
  },
  total: () => {
    const event = events.findOne({_id: getParamId('id')});
    if (!event) {
      return 0;
    }
    return event.commentators.length;
  }
});
Template.commentatorsList.events({
  'click .commentator-item'(e) {
    e.preventDefault();
    FlowRouter.go(`/sessions/start/${getParamId('id')}/commentators/${this._id}`);
  }
});


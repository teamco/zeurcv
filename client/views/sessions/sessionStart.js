import {events} from '../../../model/events.model';
import {comments} from '../../../model/comment.model';
import {audioComments} from '../../../model/audioComment.model';
import {embedFrame} from '../../../lib/youtube';
import {getParamId} from '../../../lib/utils';
import {currentUser, getUser, isLoggedIn} from '../../../lib/users';

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
      if (e.which === 13) {
        chunk.comments.push(chunk.data);
        chunk.data = '';
        e.target.value = '';
      }
      chunk.data = e.target.value;
      comments.update({_id: chunk._id}, {$set: chunk});
    } else {
      chunk = {
        comments: [],
        data: String.fromCharCode(e.which),
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

Template.audioStream.events({
  async 'click .send-audio-stream'(e) {
    e.preventDefault();
    await startRecording();
    $(e.target).addClass('stop-audio-stream');
    $(e.target).removeClass('send-audio-stream');
    $(e.target).addClass(' glyphicon-volume-off');
    $(e.target).removeClass('glyphicon-volume-down');
  },
  async 'click .stop-audio-stream'(e) {
    e.preventDefault();
    await recorder.stop();
    $(e.target).removeClass('stop-audio-stream');
    $(e.target).addClass('send-audio-stream');
    $(e.target).removeClass(' glyphicon-volume-off');
    $(e.target).addClass('glyphicon-volume-down');
  }
});

let recorder;

/**
 * @method startRecording
 * @returns {Promise<void>}
 */
async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({audio: true});
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = e => {
    //chunks.push(e.data);
    let chunk = audioComments.findOne({eventId: getParamId('id'), commentatorId: currentUser()._id});
    if (chunk) {
      chunk.data = e.data;
      chunk.audioComments.push(chunk.data);
      audioComments.update({_id: chunk._id}, {$set: chunk});
    } else {
      chunk = {
        audioComments: [],
        data: e.data,
        eventId: getParamId('id'),
        commentatorId: currentUser()._id
      };
      audioComments.insert(chunk);
    }
  };
  recorder.start();
}

Template.audioStream.helpers({});


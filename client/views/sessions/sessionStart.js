import {events} from '../../../model/events.model';
import {comments} from '../../../model/comment.model';
import {audioComments} from '../../../model/audioComment.model';
import {embedFrame} from '../../../lib/youtube';
import {blob2Base64, getParamId} from '../../../lib/utils';
import {currentUser, getUser, isLoggedIn} from '../../../lib/users';

Template.sessionStart.onRendered(() => {

  require('jquery.initialize');
  $.initialize('video', function() {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {
        $('video')[0].srcObject = stream;
      }).catch(function(error) {
        console.log('Something went wrong!', error);
      });
    }
  });
});

Template.sessionStart.helpers({
  videoVisible: () => {
    const event = events.findOne({_id: getParamId('id')});
    if (!event) {
      return {};
    }
    const visible = event.video;
    return {
      margin: !visible ? '-95 qpx' : 0,
      autoplay: !visible ? 'true' : 'false',
      display: !visible ? 'block' : 'none'
    };
  },
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
  },
  getStream: () => {
    const id = getParamId('commentatorId');
    if (!id) {
      return false;
    }
    let chunk = audioComments.find({eventId: getParamId('id'), commentatorId: id}).fetch();

    if (!chunk.length) {
      return 'Stream...';
    }
    $('audio').attr('src', chunk[0].data);
  }
});

Template.sessionStart.events({
  'click .video-stream'(e) {
    e.preventDefault();
    const $video = $('video.video-cam');
    const event = events.findOne({_id: getParamId('id')});
    if (event) {
      event.video = $video.is(':visible');
      if (event.video) {
        $video.hide();
      } else {
        $video.show();
      }
      events.update({_id: event._id}, {$set: {video: event.video}});
    }
  },
  'keyup .send-comment'(e) {
    e.preventDefault();
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
  isCurrent: _id => _id === getParamId('commentatorId'),
  connectedStreams: () => {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    return parseInt(getRandomArbitrary(1, 30), 10);
  },
  commentators: () => {
    const event = events.findOne({_id: getParamId('id')});
    if (!event) {
      return [];
    }
    return event.commentators.map(user => {
      const account = getUser(user);
      if (!account.profile.name) {
        account.profile.name = 'Guest';
      }
      return account;
    });
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
    $('.commentator-item').removeClass('current');
    $(e.target).addClass('current');
    FlowRouter.go(`/sessions/start/${getParamId('id')}/commentators/${this._id}`);
  }
});

let recorder;

Template.audioStream.events({
  async 'click .send-audio-stream'(e) {
    e.preventDefault();
    // startRecording();
    // $(e.target).addClass('stop-audio-stream');
    // $(e.target).removeClass('send-audio-stream');
    // $(e.target).addClass(' glyphicon-volume-off');
    // $(e.target).removeClass('glyphicon-volume-down');
  },
  'click .stop-audio-stream'(e) {
    e.preventDefault();
    // recorder.stop();
    // $(e.target).removeClass('stop-audio-stream');
    // $(e.target).addClass('send-audio-stream');
    // $(e.target).removeClass(' glyphicon-volume-off');
    // $(e.target).addClass('glyphicon-volume-down');
  }
});

/**
 * @method startRecording
 */
function startRecording() {
  navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
      const reader = blob2Base64(e.data);
      reader.onloadend = () => {
        let chunk = audioComments.findOne({eventId: getParamId('id'), commentatorId: currentUser()._id});
        if (chunk) {
          chunk.data = reader.result;
          audioComments.update({_id: chunk._id}, {$set: chunk});
        } else {
          chunk = {
            data: reader.result,
            eventId: getParamId('id'),
            commentatorId: currentUser()._id
          };
          audioComments.insert(chunk);
        }
      };
    };
    recorder.start(500);
  });
}

Template.audioStream.helpers({});


import {events} from '../../../model/events.model';
import {embedFrame} from '../../../lib/youtube';
import {getParamId} from '../../../lib/utils';

Template.sessionStart.helpers({
  event: () => {
    const event = events.findOne({_id: getParamId('id')});
    if (!event) {
      return 'Loading...'
    }
    const embedCode = embedFrame(event.embedCode);
    return embedCode;
  }
});
import {subscribe} from '../../template';
import {events} from '../../../../model/events.model';
import {getParamId} from '../../../../lib/utils';

Template.eventData.onRendered(function() {
  subscribe(this, ['events']);
});

Template.eventData.helpers({
  event: () => {
    return events.findOne({_id: getParamId('id')})
  }
});
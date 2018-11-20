import {subscribe} from '../../template';
import {events} from '../../../../model/events.model';
import {getParamId} from '../../../../lib/utils';

Template.eventData.onRendered(function() {
  subscribe(this, ['events']);
});

Template.eventData.helpers({
  event: () => events.findOne({_id: getParamId('id')})
});

Template.eventData.events({
  'click a[data-type="handle-event-Edit"]': event => {
    event.preventDefault();

    const $elements = $('.event-form').find('input:disabled, textarea:disabled');
    _.each($elements, input => input.removeAttribute("disabled"));
  }
});
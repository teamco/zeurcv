import {subscribe} from '../../template';
import {throwError} from '../../../../lib/logs';

/**
 * @method _filterValueByType
 * @param input
 * @param type
 * @returns {*}
 * @private
 */
function _filterValueByType(input, type) {
  type = type || input.type;
  if (type === 'checkbox') return input.checked;
  if (['text', 'textarea', 'time', 'date'].indexOf(type) > -1) return input.value;
}

/**
 * @method _collectData
 * @param $elements
 * @private
 */
function _collectData($elements) {
  let data = {};
  _.each($elements, input => data[input.name] = _filterValueByType(input, input.dataset.type));
  return data;
}

Template.eventFormData.events({
  'click a[data-type="handle-event-Create"]': event => {
    event.preventDefault();

    const $event = $('.event-form').find('input:enabled, textarea:enabled'),
        data = _collectData($event);

    Meteor.call('updateEvent', data, (error, result) => {
      if (throwError(error)) {
        return false;
      }
      FlowRouter.go('/events');
    });
  },

  'click a[data-type="preview-event"]': event => {
    event.preventDefault();
    const $iframe = $('#inject-embed-code .iframe');

    if (event.target.innerText === 'Preview') {
      $iframe.html($('[name="embedCode"]').val());
      event.target.innerText = 'Hide';
    } else {
      $iframe.html('');
      event.target.innerText = 'Preview';
    }
  }
});

Template.eventFormData.onRendered(async function() {
  subscribe(this, ['events']);
  this.$('.datetimepicker').datetimepicker();
  this.$('.timepicker').datetimepicker({
    format: 'LT'
  });
});
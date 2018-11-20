import {subscribe} from '../../template';
import {eventPages, events} from '../../../../model/events.model';
import {throwError} from '../../../../lib/logs';

/**
 * @constant HEADS
 * @type {[string,string,string,string,string]}
 */
export const HEADS = ['Info', 'Description', 'Action'];

/**
 * @method paginateEvents
 */
export const paginateEvents = () => {
  eventPages.set({
    filters: {}
  });
  eventPages.requestPage(1);
};

Template.eventsData.onRendered(function() {
  subscribe(this, ['events'], paginateEvents);
});

Template.eventsData.helpers({
  getHeads: HEADS,

  /**
   * @method eventsCount
   * @returns {number}
   */
  eventsCount: () => {
    return events.find().count();
  }
});

Template.eventsData.events({
  'click a.delete-event': function(event, template) {
    event.preventDefault();
    const data = this;

    BootstrapModalPrompt.prompt({
      title: TAPi18n.__('event_delete'),
      content: TAPi18n.__('confirm_event_delete', data.name)
    }, confirmed => {
      if (confirmed) {
        Meteor.call('destroyEvent', data._id, (error, result) => {
          if (throwError(error)) {
            return false;
          }
          Bert.alert(TAPi18n.__('event_deleted', data.name), 'info');
        });
      }
    });
  }
});

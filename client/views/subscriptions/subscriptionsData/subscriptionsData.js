import {subscriptionsPages} from '../../../../model/subscriptions.model';
import {subscribe} from '../../template';
import {events} from '../../../../model/events.model';
import {thumbnail} from '../../../../lib/youtube';
import {currentUser} from '../../../../lib/users';

export const HEADS = ['Info', 'Description', 'Action'];

export const paginateSubscriptions = () => {
  subscriptionsPages.set({
    filters: {}
  });
  subscriptionsPages.requestPage(1);
};

Template.subscriptionsData.onRendered(function() {
  subscribe(this, ['subscriptions'], paginateSubscriptions);
});

Template.subscriptionsDataItem.helpers({
  embed: _id => {
    const event = events.findOne({_id: _id});
    const url = event.embedCode;
    return thumbnail(url, 'hq');
  }
});

Template.subscriptionsData.helpers({
  getHeads: HEADS,

  /**
   * @method subscriptionsCount
   * @returns {number}
   */
  subscriptionsCount: () => {
    // return subscriptions.find().count();
    return 0;
  }
});

Template.subscriptionsDataItem.events({
  'click .unsubscribe'(e) {
    e.preventDefault();

    const event = events.findOne({_id: this._id});
    const id = currentUser()._id;
    if ((event.commentators || []).length) {
      const index = event.commentators.indexOf(id);
      if (index !== -1) event.commentators.splice(index, 1);
    }
    events.update({_id: this._id}, {$set: event});
  }
});


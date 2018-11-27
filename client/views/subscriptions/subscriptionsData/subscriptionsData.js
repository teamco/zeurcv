import {subscriptionsPages} from '../../../../model/subscriptions.model';
import {subscribe} from '../../template';


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


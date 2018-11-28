import {currentUser} from '../../../lib/users';
import {billingPlans, products, vindiciaModel} from '../../../model/products.model';

Template.vindiciaData.helpers({
  vindicia() {
    const user = currentUser();
    if (user) {
      return vindiciaModel.find({userId: user._id}).fetch();
    }
  },
  productsData() {
    return products.find().fetch();
  },
  billingsData() {
    return billingPlans.find().fetch();
  }
});

Template.vindiciaData.events({
  'click .create'(e) {
    e.preventDefault();
    const user = currentUser();
    if (user) {
      Meteor.call('createSubscription', {
        accountID: user.profile.email,
        product: $('#sel1').val(),
        billingPlan: $('#sel2').val()
      }, (error, result) => {
        if (error) {
          return false;
        }
        Bert.alert('Subscription create failed: PaymentMethod->validation failed')
      });
    }
  }
});
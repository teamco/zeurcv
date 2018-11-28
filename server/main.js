import {Meteor} from 'meteor/meteor';
import {get_billing_plans, get_products} from './vindicia/products';

Meteor.startup(() => {
  get_products();
  get_billing_plans();
  // code to run on server at startup
});

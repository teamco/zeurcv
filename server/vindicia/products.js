import {callAPI} from './vindicia';
import {billingPlans, products} from '../../model/products.model';

export function get_products() {
  callAPI('GET', 'products', null, (error, result) => {
    if (error || (result.statusCode !== 200)) {
      return false;
    }

    const productsData = result['data'];

    if (!productsData || (productsData['total_count'] === 0)) {
      return false;
    }

    // clear all previous products
    products.remove({});

    // populate products collection
    for (let index in productsData.data) {
      if (productsData.data.hasOwnProperty(index)) {
        const productData = productsData.data[index];
        const id = productData['id'];

        if (id && id.match(/KomenTo_/)) {
          products.insert(productData);
        }
      }
    }

    console.log('loaded ' + products.find().count() + ' products.');
  });
}

export function get_billing_plans() {
  callAPI('GET', 'billing_plans', null, (error, result) => {
    if (error || (result.statusCode !== 200)) {
      return false;
    }

    const billingPlansData = result['data'];

    if (!billingPlansData || (billingPlansData['total_count'] === 0)) {
      return false;
    }

    // clear all previous products
    billingPlans.remove({});

    // populate products collection
    for (let index in billingPlansData.data) {
      if (billingPlansData.data.hasOwnProperty(index)) {
        const billingPlanData = billingPlansData.data[index];
        const id = billingPlanData['id'];

        if (id && id.match(/KomenTo_/)) {
          billingPlans.insert(billingPlanData);
        }
      }
    }

    console.log('loaded ' + billingPlans.find().count() + ' billing plans.');
  });
}

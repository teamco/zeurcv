import {callAPI} from './vindicia.js';
import {products} from '../../model/products.model';

export const getProducts = () => {
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
};
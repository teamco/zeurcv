import {callAPI, setStatus} from './vindicia';

export const loginAccount = (accountID, callback) => {
  callAPI('GET', 'accounts/' + accountID, null, (error, result) => {
    if (error || (result.statusCode !== 200)) {
      createAccount(accountID, callback);
      return;
    }

    const responseType = result.data.object;
    if (responseType === 'Account') {
      setAccount(accountID, result.data, false, callback);
    } else {
      createAccount(accountID, callback);
    }
  });
};

function createAccount(accountID, callback) {
  let post_data = {'id': accountID, 'email': accountID};

  callAPI('POST', 'accounts', post_data, (error, result) => {
    if (error || (result.statusCode !== 200)) {
      callback(null);
    }

    // create a payment method for the account
    createAccountPaymentMethod(accountID, () => {

      // add free tier subscription to the account
      createSubscription(accountID, 'KomenTo_Free_Tier', 'KomenTo_Free', (subscription) => {
        setAccount(accountID, result.data, true, callback);
      });
    });
  });

}

function setAccount(accountID, account, isNew, callback) {
  setStatus(account, isNew);

  // add entitlements to account and call back
  accountEntitelments(accountID, (entitlements) => {

    entitlements = entitlements || [];
    entitlements = entitlements.length ? entitlements : [
      'KomenTo_Free'
    ];

    if (entitlements.indexOf('KomenTo_Free') === -1) {
      entitlements.push('KomenTo_Free');
    }
    account.entitlements = entitlements;

    // inform on activeAccount
    callback(account);
  });
}

function accountEntitelments(accountID, callback) {
  accountSubscriptions(accountID, null, (subscriptions) => {
    if (!subscriptions) {
      callback([]);
      return;
    }

    let entitlements = [];
    for (let subscriptionIndex in subscriptions.data) {
      if (subscriptions.data.hasOwnProperty(subscriptionIndex)) {
        const subscription = subscriptions.data[subscriptionIndex];

        for (let itemIndex in subscription.items.data) {
          if (subscription.items.data.hasOwnProperty(itemIndex)) {
            const subscriptionItem = subscription.items.data[itemIndex];
            const product = subscriptionItem.product;

            for (let entitlementIndex in product.entitlements.data) {
              if (product.entitlements.data.hasOwnProperty(entitlementIndex)) {
                const entitlement = product.entitlements.data[entitlementIndex];
                const entitlementID = entitlement.id;

                if (entitlements.indexOf(entitlementID) === -1) {
                  entitlements.push(entitlementID);
                }
              }
            }
          }
        }

      }
    }

    callback(entitlements);
  });
}

export const accountSubscriptions = (accountID, subscriptionID, callback) => {
  let path = 'subscriptions';
  if (subscriptionID) {
    path += '/' + subscriptionID;
  } else {
    path += '?account=' + accountID;
  }

  callAPI('GET', path, null, (error, result) => {
    if (error || (result.statusCode !== 200)) {
      callback(null);
      return;
    }

    // inform on subscriptions
    callback(result.data);
  });
};

export const createSubscription = (accountID, billingPlan, product, callback) => {
  let subscriptionID = accountID + '_' + billingPlan + '_' + product;

  let post_data =
      {
        'object': 'Subscription',
        'id': subscriptionID,
        'account': {
          'object': 'Account',
          'id': accountID
        },
        'billing_plan': {
          'object': 'BillingPlan',
          'id': billingPlan
        },
        'payment_method': {
          'object': 'PaymentMethod',
          'id': 'payment_' + accountID // hardcoded dummy for account
        },
        'currency': 'USD',
        'description': 'Subscription for account ' + accountID + ' with billing plan ' + billingPlan + ' and product ' +
            product,
        'items': [
          {
            'object': 'SubscriptionItem',
            'product': {
              'object': 'Product',
              'id': product
            }
          }
        ],
        'minimum_commitment': 0,
        'policy': {
          'ignore_cvn_policy': 1,
          'ignore_avs_policy': 1,
          'min_chargeback_probability': 99,
          'immediate_auth_failure_policy': 'doNotSaveAutoBill',
          'validate_for_future_payment': 0
        }
      };

  // first lets check if the subscription exists
  accountSubscriptions(accountID, subscriptionID, (subscriptions) => {
    if (subscriptions && (subscriptions.object === 'List')) {
      setStatus(subscriptions, false);
      callback(subscriptions);
    } else {

      // need to create a new subscription
      callAPI('POST', 'subscriptions', post_data, (error, result) => {
        if (error || (result.statusCode !== 200)) {
          callback(null);
        }

        // inform on new subscription
        setStatus(result.data, true);
        callback(result.data);
      });
    }
  });
};

function createAccountPaymentMethod(accountID, callback) {
  let post_data = {
    'object': 'PaymentMethod',
    'id': 'payment_' + accountID,
    'type': 'CreditCard',

    'credit_card': {
      'object': 'CreditCard',
      'account': '341111111111111',
      'expiration_date': '201805'
    },

    "account_holder": "Charles X. Brown",
    "billing_address": {
      "object": "Address",
      "name": "Charlie Brown",
      "line1": "123 Main Street",
      "city": "San Francisco",
      "district": "CA",
      "postal_code": "94105",
      "country": "US",
      "phone": "415-555-3212"
    },

    'customer_specified_type': 'Personal Amex',
    'primary': false,
    'policy': {
      'min_chargeback_probability': 100,
      'validate': 1
    }
  };

  // need to create a new payment method for account
  callAPI('POST', 'payment_methods', post_data, (error, result) => {
    callback();
  });
}

Meteor.methods({
  createSubscription(opts) {
    createSubscription(opts.accountID, opts.billingPlan, opts.product, data => {
      return data;
    });
  }
});
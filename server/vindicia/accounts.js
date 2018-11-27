import {callAPI} from './vindicia.js';

export const loginAccount = (accountID, callback) => {
  callAPI('GET', 'accounts/' + accountID, null, (error, result) => {
    if (error || (result.statusCode !== 200)) {
      createAccount(accountID, callback);
      return;
    }

    const responseType = result.data.object;
    if (responseType === 'Account') {
      let activeAccount = result.data;
      activeAccount.status = 'existing';

      // inform on activeAccount
      callback(result.data);
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

    let activeAccount = result.data;
    activeAccount.status = 'new';

    // inform on activeAccount
    callback(result.data);
  });

}

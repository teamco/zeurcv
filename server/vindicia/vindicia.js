import {HTTP} from 'meteor/http';

export const callAPI = function(method, path, post_data, callback) {
  const host = 'https://api.prodtest.vindicia.com/';

  // An object of options to indicate where to post to
  let post_options = {
    data: post_data,
    headers: {
      'Authorization': 'Basic aGFjazJfc29hcDpVYThjeWNxQkw1bzFEQ3hUTkRFenE5NHV0UVFBRTQzeg=='
    }
  };

  try {
    HTTP.call(method, host + path, post_options, function(error, result) {
      /*if (error) {
          console.error("path " + path + "\n" + error);
      } else {
          console.log("path " + path + "\nresult: " + result);
      }*/

      callback(error, result);
    });
  } catch (e) {
    callback('Error ' + e, null);
  }
};

export const setStatus = (object, isNew) => {
  if (object) {
    if (isNew) {
      object.status = 'new';
    } else {
      object.status = 'existing';
    }
  }
};
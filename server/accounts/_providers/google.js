import {throwError} from '../../../lib/logs';
import {HTTP} from 'meteor/http';

/**
 * @method googleProfile
 * @param user
 * @param info
 * @returns {{name, email, link, locale: *, picture: *}}
 */
export const googleProfile = (user, info) => {
  const accessToken = user.services.google.accessToken;
  const result = HTTP.call('GET', 'https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {'User-Agent': 'Meteor/1.0'},
    params: {access_token: accessToken}
  });

  if (result.error) {
    return throwError(result.error);
  }

  return {
    name: info.name,
    email: info.email,
    link: result.data.profile,
    locale: info.locale,
    picture: info.picture
  };
};
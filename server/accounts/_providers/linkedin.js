import {throwError} from '../../../lib/utils';

/**
 * @method linkedinProfile
 * @param user
 * @param info
 * @returns {{name, email, link, locale: *, picture: *}}
 */
export const linkedinProfile = (user, info) => {

  const accessToken = user.services.linkedin.accessToken;

  // http://developer.linkedin.com/documents/profile-fields
  const basicProfileFields = [
        'first-name', 'last-name', 'maiden-name', 'formatted-name', 'phonetic-first-name',
        'phonetic-last-name', 'formatted-phonetic-name', 'headline', 'location',
        'industry', 'num-connections', 'num-connections-capped', 'summary',
        'specialties', 'positions', 'picture-url', 'picture-urls::(original)', 'site-standard-profile-request'],
      emailFields = ['email-address'],
      fullProfileFields = [
        'last-modified-timestamp', 'proposal-comments', 'associations', 'interests', 'publications',
        'patents', 'languages', 'skills', 'certifications', 'educations',
        'courses', 'volunteer', 'three-current-positions', 'three-past-positions', 'num-recommenders',
        'recommendations-received', 'following', 'job-bookmarks', 'suggestions', 'date-of-birth'],
      contactInfoFields = [
        'phone-numbers',
        'bound-account-types',
        'im-accounts',
        'main-address',
        'twitter-accounts',
        'primary-twitter-account'];

  const requestUrl = 'https://api.linkedin.com/v1/people/~:(' +
      _.union(basicProfileFields, emailFields, fullProfileFields, contactInfoFields).join(',') + ')';

  /**
   * @constant response
   * @type {{error, data: {formattedName, emailAddress, siteStandardProfileRequest, pictureUrl}}}
   */
  const response = Meteor.http.get(requestUrl, {
    headers: {'User-Agent': 'Meteor/1.0'},
    params: {
      oauth2_access_token: accessToken,
      format: 'json'
    }
  });

  if (response.error) throwError(response.error);

  return {
    name: response.data.formattedName,
    email: response.data.emailAddress,
    link: response.data.siteStandardProfileRequest.url,
    locale: response.data.location.name,
    picture: response.data.pictureUrl,
    headline: response.data.headline,
    industry: response.data.industry,
    numConnections: response.data.numConnections,
    currentPosition: response.data.positions
  };
};
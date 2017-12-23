/**
 * @method facebookProfile
 * @param user
 * @param info
 * @returns {{email, picture: string, link}}
 */
export const facebookProfile = (user, info) => {
  return {
    email: info.email,
    picture: 'http://graph.facebook.com/' + info.id + '/picture/?type=small',
    link: info.link
  };
};
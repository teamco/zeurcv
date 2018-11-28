/**
 * @method vimeoEmbed
 * @param url
 * @returns {string}
 */
export const vimeoEmbed = url => {
  const id = url.replace(/https\:\/\/vimeo.com\//, '');
  return `<iframe src="https://player.vimeo.com/video/${id}" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`
};
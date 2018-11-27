/**
 * @constant
 * @param {string} url
 * @param [opts]
 * @returns {string}
 */
export const embedFrame = (url, opts) => {
  opts = opts || {};
  const regex = /https:\/\/www.youtube.com\/watch\?v=/;
  const id = url.replace(regex, '');
  const src = `https://www.youtube.com/embed/${id}`;
  const allow = opts.allow || 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
  const width = opts.width || '100%';
  const height = opts.height || '100%';
  return `<iframe width="${width}" height="${height}" src="${src}" frameborder="0" allow="${allow}" allowfullscreen></iframe>`;
};

/**
 * @constant
 * @param {string} url
 * @param {string} [type]
 * @returns {string}
 */
export const thumbnail = (url, type) => {
  const path = 'http://img.youtube.com/vi/';
  const regex = /https:\/\/www.youtube.com\/watch\?v=/;
  const id = url.replace(regex, '');

  // The default thumbnail image
  let img = type || '';
  switch (type) {
    // For the high quality version of the thumbnail
    case 'hq':
    // There is also a medium quality version of the thumbnail
    case 'mq':
    // For the standard definition version of the thumbnail
    case 'sd':
    // For the maximum resolution version of the thumbnail
    case 'maxres':
      img = type;
      break;
  }

  return `${path}${id}/${img}default.jpg`;
};
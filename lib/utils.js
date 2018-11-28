/**
 * @method currentRoute
 */
import {embedFrame, thumbnail} from './youtube';
import {vimeoEmbed} from './vimeo';

export const currentRoute = () => FlowRouter.current();

/**
 * @method getParamId
 * @param type
 */
export const getParamId = type => currentRoute().params[type];

/**
 * @method isSingularized
 * @param str
 */
export const isSingularized = (str) => pluralize(str, 1) === str;

/**
 * @method modelName
 */
export const modelName = () => currentRoute().route.name;

/**
 * @method pageTitle
 */
export const pageTitle = () => s.humanize(modelName());

/**
 * @method templateName
 */
export const templateName = () => s.camelize(pluralize(pageTitle(), 2).toLowerCase());

/**
 * @method runTemplateHelper
 * @param template
 * @param method
 */
export const runTemplateHelper = (template, method) => template.__helpers.get(method).call();

/**
 * @method parentTemplateName
 * @return {string}
 */
export const parentTemplateName = () => Template.instance().parentTemplate().view.name.replace(/Template\./, '');

/**
 * @method blob2Base64
 * @param blob
 * @returns {FileReader}
 */
export const blob2Base64 = blob => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return reader;
};

/**
 * @method base64toBlob
 */
export const base64toBlob = (b64Data, contentType) => {
  const BASE64_MARKER = ';base64,';

  function convertDataURIToBinary(dataURI) {
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  const blob = new Blob([convertDataURIToBinary(b64Data)], {type: contentType});
  return URL.createObjectURL(blob);
};

/**
 * @method embedVideo
 * @param url
 * @returns {string}
 */
export const embedVideo = url => {
  if (url.match(/youtube/)) {
    return embedFrame(url);
  }

  if (url.match(/vimeo/)) {
    return vimeoEmbed(url);
  }
};

/**
 * @param url
 * @param type
 * @returns {string}
 */
export const getThumbnail = (url, type) => {
  if (url.match(/youtube/)) {
    return `<img src="${thumbnail(url, type)}" />`;
  }
  if (url.match(/vimeo/)) {
    return vimeoEmbed(url);
  }
};
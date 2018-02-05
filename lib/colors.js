/**
 * @method _hex
 * @param c
 * @return {string}
 * @private
 */
function _hex(c) {
  const s = '0123456789abcdef';
  let i = parseInt(c);
  if (!i || isNaN(c))
    return '00';
  i = Math.round(Math.min(Math.max(0, i), 255));
  return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
}

/**
 * Convert an RGB triplet to a hex string
 * @param rgb
 * @return {*}
 * @private
 */
function _convertToHex(rgb) {
  return _hex(rgb[0]) + _hex(rgb[1]) + _hex(rgb[2]);
}

/**
 * Remove '#' in color hex string
 * @method _trim
 * @param s
 * @private
 * @return {string}
 */
function _trim(s) {
  return (s.charAt(0) === '#') ? s.substring(1, 7) : s;
}

/**
 * Convert a hex string to an RGB triplet
 * @method _convertToRGB
 * @param hex
 * @return {Array}
 * @private
 */
function _convertToRGB(hex) {
  let color = [];
  color[0] = parseInt((_trim(hex)).substring(0, 2), 16);
  color[1] = parseInt((_trim(hex)).substring(2, 4), 16);
  color[2] = parseInt((_trim(hex)).substring(4, 6), 16);
  return color;
}

/**
 * @method _generateColor
 * @param {string} colorStart
 * @param {string} colorEnd
 * @param {number} colorCount The number of colors to compute.
 * @private
 * @return {Array}
 */
function _generateColor(colorStart, colorEnd, colorCount) {

  // The beginning of your gradient
  const start = _convertToRGB(colorStart);

  // The end of your gradient
  const end = _convertToRGB(colorEnd);

  //Alpha blending amount
  let alpha = 0.0;
  let data = [];

  for (let i = 0; i < colorCount; i++) {
    let c = [];
    alpha += (1.0 / colorCount);
    c[0] = start[0] * alpha + (1 - alpha) * end[0];
    c[1] = start[1] * alpha + (1 - alpha) * end[1];
    c[2] = start[2] * alpha + (1 - alpha) * end[2];
    data.push(_convertToHex(c));
  }
  return data;
}

/**
 * @method gradient
 * @param {string} from
 * @param {string} to
 * @param {number} colors
 * @param {number} index
 * @return {*}
 */
export const gradient = (from, to, colors, index) => {
  const palette = _generateColor(from, to, colors);
  return '#' + palette[index];
};
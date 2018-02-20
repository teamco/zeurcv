/**
 * @method _is
 * @param data
 * @param {string} value
 * @return {boolean}
 * @private
 */
function _is(data, value) {
  return data.item.dataset.type === value;
}

Template.editForm.helpers({

  /**
   * @method isText
   * @return {boolean}
   */
  isText() {
    return _is(this, 'text');
  },

  /**
   * @method isTextarea
   * @return {boolean}
   */
  isTextarea() {
    return _is(this, 'textarea');
  },

  /**
   * @method isCheckbox
   * @return {boolean}
   */
  isCheckbox() {
    return _is(this, 'checkbox');
  }
});
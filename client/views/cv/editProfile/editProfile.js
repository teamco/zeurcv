/**
 * @constant _deps
 * @type {Tracker.Dependency}
 * @private
 */
const _deps = new Tracker.Dependency;

Template.editAccountProfile.helpers({

  /**
   * @property deps
   * @type {Tracker.Dependency}
   */
  deps: _deps,

  /**
   * @method show
   * @type {{boolean}}
   */
  show: () => {
    _deps.depend();
    return false;
  },

  /**
   * @method content
   * @return {Array}
   */
  content: () => {
    _deps.depend();
    return [];
  },

  /**
   * @method noContent
   * @param content
   * @return {boolean}
   */
  noContent: content => !content.length,

  /**
   * @method placeholder
   * @param element
   * @return {string | (string | null) | string}
   */
  placeholder: element => element.getAttribute('data-label'),

  /**
   * @method isVisible
   * @param show
   * @return {string}
   */
  isVisible: (show) => show ? ' show' : ''
});

Template.editAccountProfile.events({

  /**
   * @method input
   * @param e
   */
  'input .m-edit-text'(e) {
    e.preventDefault();

    const reference = e.target.getAttribute('placeholder');
    const area = document.querySelector('[data-label="' + reference + '"]');
    area.innerText = e.target.value;
  }
});
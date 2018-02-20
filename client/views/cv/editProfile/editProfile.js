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
   * @method addable
   * @return {boolean}
   */
  addable: () => {
    _deps.depend();
    return false;
  },

  /**
   * @method dataReference
   * @return {string}
   */
  dataReference: () => {
    _deps.depend();
    return '';
  },

  /**
   * @method fieldType
   * @return {string}
   */
  fieldType: () => {
    _deps.depend();
    return 'hidden';
  },

  /**
   * @method noContent
   * @param content
   * @return {boolean}
   */
  noContent: content => !content.length,

  /**
   * @method isVisible
   * @param show
   * @return {string}
   */
  isVisible: (show) => show ? ' show' : '',
});

Template.editAccountProfile.events({

  /**
   * @event input
   * @param e
   */
  'input .m-edit-text'(e) {
    e.preventDefault();

    const reference = e.target.getAttribute('placeholder');
    const area = document.querySelector('[data-label="' + reference + '"]');
    area.innerText = e.target.value;
  },

  /**
   * @event click
   * @param e
   */
  'click .add-before-action'(e) {
    e.preventDefault();

    const attr = 'data-reference';
    const reference = e.target.closest('[' + attr + ']').getAttribute(attr);
    const cvContainer = document.querySelector('.cv-container');
    const content = cvContainer.querySelector('[' + attr + '="' + reference + '"]');
    //const area = document.querySelector('[data-label="' + reference + '"]');

    debugger;
  }
});
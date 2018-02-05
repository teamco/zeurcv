import {subscribe} from '../../template';
import {templates} from '../../../../model/templates.model';

/**
 * @method _configTemplate
 * @private
 */
export const _configTemplate = function() {
  subscribe(this, ['templates']);
};

Template.templateItems.onRendered(_configTemplate);

Template.templateItems.helpers({

  /**
   * @property allowAdd
   * @type {boolean}
   */
  allowAdd: true,

  /**
   * @method templatesCount
   * @returns {number}
   */
  templateItemsCount: () => templates.find().count(),

  /**
   * @method templates
   * @return {any}
   */
  templates: () => templates.find({}, {sort: {updatedAt: -1, counter: 1}}).fetch()
});
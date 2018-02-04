import {subscribe} from '../../template';
import {templates} from '../../../../model/templates.model';

/**
 * @method _configTemplate
 * @private
 */
export const _configTemplate = function() {
  subscribe(this, ['templates']);
};

Template.templates.onRendered(_configTemplate);

Template.templates.helpers({

  /**
   * @method templatesCount
   * @returns {number}
   */
  templatesCount: () => templates.find().count(),

  /**
   * @method templates
   * @return {any}
   */
  templates: () => templates.find().fetch()
});
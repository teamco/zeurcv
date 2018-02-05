import {runTemplateHelper} from '../../../../lib/utils';
import {configProfileTemplate} from '../accountProfilesData/accountProfiles';

Template.profileTemplate.onRendered(configProfileTemplate);

Template.profileTemplate.helpers({

  /**
   * @method templatesCount
   * @return {*}
   */
  profileTemplatesCount: () => runTemplateHelper(Template.templateItems, 'templateItemsCount'),

  /**
   * @method templates
   */
  templates: () => runTemplateHelper(Template.templateItems, 'templates')
});
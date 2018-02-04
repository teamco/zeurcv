import {runTemplateHelper} from '../../../../lib/utils';
import {configProfileTemplate} from '../accountProfilesData/accountProfiles';

Template.cvTemplate.onRendered(configProfileTemplate);

Template.cvTemplate.helpers({

  /**
   * @method templatesCount
   * @return {*}
   */
  profileTemplatesCount: () => runTemplateHelper(Template.templates, 'templatesCount'),

  /**
   * @method templates
   */
  templates: () => runTemplateHelper(Template.templates, 'templates')
});
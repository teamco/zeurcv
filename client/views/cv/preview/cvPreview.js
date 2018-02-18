import {configProfileTemplate} from '../accountProfilesData/accountProfiles';
import {accountProfile} from '../../../../model/accountProfile.model';
import {getUser} from '../../../../lib/users';
import {getParamId} from '../../../../lib/utils';
import {setHelperMethod} from '../../template';

Template.cvPreview.onRendered(configProfileTemplate);

Template.cvPreview.helpers({

  /**
   * @method profile
   * @param id
   * @return {any}
   */
  profile: id => {
    id = id || getParamId('profileId');
    return accountProfile.findOne({userId: getUser()._id, _id: id});
  }
});

/**
 * @constant editableAreas
 * @type {string[]}
 */
const editableAreas = ['cvContactInfo', 'cvSkills', 'cvHeadline', 'cvExperience', 'cvEducation'];

editableAreas.forEach(area => {

  // Define template events
  Template[area].events({

    /**
     * @method click
     * @param {{preventDefault, target}} e
     */
    'click .m-panel'(e) {
      e.preventDefault();
      document.querySelectorAll('.m-selected').forEach(node => node.classList.remove('m-selected'));
      e.target.classList.add('m-selected');

      const editableItems = Array.from(e.target.querySelectorAll('[data-edit="true"]'));
      setHelperMethod('editAccountProfile', 'show', true);
      setHelperMethod('editAccountProfile', 'addable', !!e.target.getAttribute('data-add'));
      setHelperMethod('editAccountProfile', 'content', editableItems);
    }
  });

});
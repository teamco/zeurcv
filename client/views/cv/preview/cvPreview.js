import {configProfileTemplate} from '../accountProfilesData/accountProfiles';
import {accountProfile} from '../../../../model/accountProfile.model';
import {getUser} from '../../../../lib/users';
import {getParamId} from '../../../../lib/utils';
import {setHelperMethod} from '../../template';

/**
 * @method _profile
 * @param {string} [id]
 * @return {any}
 */
function _profile(id) {
  id = id || getParamId('profileId');
  return accountProfile.findOne({userId: getUser()._id, _id: id});
}

Template.cvPreview.onRendered(configProfileTemplate);

Template.cvPreview.helpers({

  /**
   * @method profile
   * @param {string} [id]
   * @return {any}
   */
  profile: id => _profile(id),

  /**
   * @property contactInfoData
   */
  contactInfoData: () => {
    const profile = _profile();
    return profile ? [
      {
        label: 'Email',
        store: 'profile.emailAddress',
        css: 'm-content-mail',
        data: profile.emailAddress,
        edit: true
      },
      {
        label: 'Address',
        store: 'profile.location.name',
        data: profile.location.name,
        edit: true
      },
      {
        label: 'Phone',
        store: 'profile.phone',
        data: profile.phone,
        edit: true
      }
    ] : [];
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

      const node = e.target;
      node.classList.add('m-selected');

      const editableItems = Array.from(node.querySelectorAll('[data-edit="true"]'));
      const reference = node.parentElement.querySelector('[data-reference]');
      const content = editableItems.map(item => {
        return {
          dataset: item.dataset,
          value: item.innerText,
          checked: !!item.value
        };
      });

      setHelperMethod('editAccountProfile', 'show', true);
      setHelperMethod('editAccountProfile', 'addable', !!e.target.getAttribute('data-add'));
      setHelperMethod('editAccountProfile', 'content', content);
      setHelperMethod('editAccountProfile', 'dataReference',
          (reference || node.closest('[data-reference]')).getAttribute('data-reference'));
    }
  });
});
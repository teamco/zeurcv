import {currentRoute, getParamId, parentTemplateName} from '../../../../../../lib/utils';
import {throwError} from '../../../../../../lib/logs';
import {gradient} from '../../../../../../lib/colors';

Template.templateItem.helpers({

  /**
   * @method image
   * @param {Uint8Array} buffer
   * @return {string}
   */
  image: buffer => {

    //encode to base64
    const blob = new Blob([buffer], {type: 'image/png'});
    return URL.createObjectURL(blob);
  },

  /**
   * @method color
   * @param index
   * @return {*}
   */
  color: index => gradient('#23c6c8', '#dedede', 100, index)
});

Template.templateItem.events({

  /**
   * @event click
   * @param event
   * @param template
   */
  'click .cv-template'(event, template) {
    event.preventDefault();
    const parentTemplate = parentTemplateName();
    if (parentTemplate === 'templateItems') {
      return false;
    }
    if (parentTemplate === 'profileTemplate') {
      const currentPath = currentRoute().path;
      const templateId = this.id;
      Meteor.call('updateTemplate', templateId, currentPath, error => {
        if (error) {
          return throwError(error);
        } else {
          FlowRouter.go('profilePreview', {
            profileId: getParamId('profileId'),
            templateId: templateId
          });
        }
      });
    }
  }
});
import {currentRoute, currentUrl, parentTemplateName} from '../../../../../../lib/utils';

Template.templateItem.helpers({

  /**
   * @method image
   * @param data
   * @return {string}
   */
  image: data => {

    //encode to base64
    const image = btoa(String.fromCharCode.apply(null, data));
    return 'data:image/png;base64,' + image;
  }
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
    if (parentTemplate === 'templates') {
      return false;
    }
    if (parentTemplate === 'cvTemplate') {
      Meteor.call('updateTemplate', this._id, currentRoute().path);
    }
  }
});
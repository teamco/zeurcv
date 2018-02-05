import {templates} from '../../model/templates.model';
import {is404} from '../../lib/logs';
import {currentRoute} from '../../lib/utils';

Meteor.methods({

  /**
   * @method saveTemplate
   * @param buffer
   */
  saveTemplate: buffer => {
    templates.insert({
      data: buffer,
      public: true,
      counter: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  /**
   * @method updateTemplate
   * @param {string} id
   * @param {string} url
   * @return {boolean}
   */
  updateTemplate: (id, url) => {
    const template = templates.findOne({_id: id});
    if (!template) {
      is404(id, url);
      return false;
    }
    templates.update({_id: id}, {
      $set: {
        updatedAt: new Date(),
        counter: template.counter + 1
      }
    });
  }
});
import {templates} from '../../model/templates.model';

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
  }
});
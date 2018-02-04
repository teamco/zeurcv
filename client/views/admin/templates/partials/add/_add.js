Template.addTemplate.events({

  /**
   * @event click
   * @param event
   * @param template
   */
  'change input#cv-upload': (event, template) => {

    event.preventDefault();

    //assuming 1 file only
    const file = event.target.files[0];
    if (!file) return;
    //create a reader according to HTML5 File API
    const reader = new FileReader();

    /**
     * @method onload
     */
    reader.onload = () => {
      // convert to binary
      const buffer = new Uint8Array(reader.result);
      Meteor.call('saveTemplate', buffer);
    };

    //read the file as array buffer
    reader.readAsArrayBuffer(file);
  }
});
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
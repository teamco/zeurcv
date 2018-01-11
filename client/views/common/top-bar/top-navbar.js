Template.topNavbar.rendered = function() {

  // FIXED TOP NAVBAR OPTION
  // Uncomment this if you want to have fixed top navbar
  // $('body').addClass('fixed-nav');
  // $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');

};

Template.topNavbar.events({

  // Toggle right sidebar
  'click .right-sidebar-toggle': () => {
    $('#right-sidebar').toggleClass('sidebar-open');
  },

  // Toggle left navigation
  'click #navbar-minimalize': event => {
    event.preventDefault();

    const $body = $('body');
    const $sideMenu = $('#side-menu');

    // Toggle special class
    $body.toggleClass('mini-navbar');

    // Enable smoothly hide/show menu
    if (!$body.hasClass('mini-navbar') || $body.hasClass('body-small')) {
      // Hide menu in order to smoothly turn on when maximize menu
      $sideMenu.hide();
      // For smoothly turn on menu
      setTimeout(() => {
        $sideMenu.fadeIn(400);
      }, 200);
    } else if ($body.hasClass('fixed-sidebar')) {
      $sideMenu.hide();
      setTimeout(() => {
        $sideMenu.fadeIn(400);
      }, 100);
    } else {
      // Remove all inline style from jquery fadeIn function to reset menu state
      $sideMenu.removeAttr('style');
    }
  }

});

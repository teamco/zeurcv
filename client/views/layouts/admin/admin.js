Template.adminLayout.rendered = function() {

  // Minimize menu when screen is less than 768px
  $(window).on('resize load', function() {
    const $body = $('body');
    if ($(this).width() < 769) {
      $body.addClass('body-small');
    } else {
      $body.removeClass('body-small');
    }
  });

  // Fix height of layout when resize, scroll and load
  $(window).on('load resize scroll', () => {
    const $body = $('body');
    if (!$body.hasClass('body-small')) {

      const $wrapper = $('#page-wrapper');
      const navbarHeight = $('nav.navbar-default').height();
      const wrapperHeight = $wrapper.height();

      if (navbarHeight > wrapperHeight) {
        $wrapper.css('min-height', navbarHeight + 'px');
      }

      if (navbarHeight < wrapperHeight) {
        $wrapper.css('min-height', $(window).height() + 'px');
      }

      if ($body.hasClass('fixed-nav')) {
        if (navbarHeight > wrapperHeight) {
          $wrapper.css('min-height', navbarHeight + 'px');
        } else {
          $wrapper.css('min-height', $(window).height() - 60 + 'px');
        }
      }
    }
  });

  require('jquery.initialize');

  $.initialize('[data-toggle="tooltip"]', function() {
    $(this).tooltip({boundary: 'viewport'});
  });
};

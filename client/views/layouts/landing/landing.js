import {cbpAnimatedHeader} from '../../../../lib/plugins/cbpAnimatedHeader';

Template.landingLayout.onRendered(() => {

  // Highlight the top nav as scrolling
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 80
  });

  // Page scrolling feature
  $('a.page-scroll').bind('click', function(event) {
    const link = $(this);
    $('html, body').stop().animate({
      scrollTop: $(link.attr('href')).offset().top - 70
    }, 500);
    event.preventDefault();
  });

  // Activate WOW.js plugin for animation on scroll
  new WOW().init();

  cbpAnimatedHeader();
});

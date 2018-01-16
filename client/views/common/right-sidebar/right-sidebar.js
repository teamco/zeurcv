Template.rightSidebar.onRendered = () => {

  // Initialize slimscroll for right sidebar
  $('.sidebar-container').slimScroll({
    height: '100%',
    railOpacity: 0.4,
    wheelStep: 10
  });

  // Move right sidebar top after scroll
  $(window).scroll(() => {
    const rightBar = $('#right-sidebar');
    if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
      rightBar.addClass('sidebar-top');
    } else {
      rightBar.removeClass('sidebar-top');
    }
  });
};
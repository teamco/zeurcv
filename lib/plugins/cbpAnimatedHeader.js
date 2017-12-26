/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
export const cbpAnimatedHeader = () => {

  const docElem = document.documentElement,
      header = document.querySelector('.navbar-default'),
      changeHeaderOn = 200;
  let didScroll = false;

  function init() {
    window.addEventListener('scroll', function(event) {
      if (!didScroll) {
        didScroll = true;
        setTimeout(scrollPage, 250);
      }
    }, false);
  }

  function scrollPage() {
    const sy = scrollY();
    if (sy >= changeHeaderOn) {
      header.classList.add('navbar-scroll');
    }
    else {
      header.classList.remove('navbar-scroll');
    }
    didScroll = false;
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  init();

};
/* ===================
    Table Of Content
======================
02 COUNTER
04 WOW
06 SWIPER SLIDER
08 STICKY BAR
10 FIT VIDEO
11 PARALLAX
13 CONTACT FORM
14 IE DETECTION
15 MEGA MENU

======================*/
(function ($) {
  "use strict";

  // BEGIN: 02 Counter
  var CountTo = function () {
    var initInstances = function () {
      var $count = $('.counter-item-digit');
      if ($count.length) {
        $count.appear(function (direction) {
          $(this).countTo();
        }, {
          offset: '100%',
          triggerOnce: true
        });
      }
    };

    return {
      init: function () {
        initInstances();
      }
    };
  }();
  // END: Counter

  // BEGIN: 04 Wow
  var wow = function () {
    if ($('.wow').length) {
      wow = new WOW({
        mobile: true  // Turn on/off WOW.js on mobile devices.
      }).init();
    }
  };
  // END: Wow Js

  // BEGIN: 06 Swiper Slider
  var swiperSlider = function () {
    if ($(".swiper-slider-fade").length !== 0) {
      var swiper = new Swiper('.swiper-container', {
        effect: 'fade', //other supported effects: coverflow, flip, cube, slide
        pagination: null,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 5000,
        speed: 1000,
        spaceBetween: 0,
        loop: true,
        simulateTouch: true,
        onSlideChangeEnd: function (swiper) {
          $('.swiper-slide').each(function () {
            if ($(this).index() === swiper.activeIndex) {
              // Fadein in active slide
              $(this).find('.slider-content').fadeIn(25);
            }
            else {
              // Fadeout in inactive slides
              $(this).find('.slider-content').fadeOut(25);
            }
          });
        }
      });
    }
  };
  // END: Swiper Slider

  // BEGIN: 08 Sticky bar
  var stickyBar = function () {

    if ($(".sticky-element").length) {
      var $stickyElement = $(".sticky-element");
      if ($(window).width() <= 1024) {
        $stickyElement.trigger('sticky_kit:detach');
      }
      else {
        $stickyElement.stick_in_parent({
          offset_top: 100
        });
      }
    }
  };
  // END: Sticky bar

  // BEGIN: 10 Fit Video
  var fullWithvideo = function () {
    // Target your .container, .wrapper, .post, etc.
    if ($(".fit-video").length) {
      var $fitvideo = $(".fit-video");
      $fitvideo.fitVids();
    }
  };
  // END: Fit Video

  // BEGIN: 11 Parallax
  var jarallax = function () {
    if ($('.parallax-bg').length) {
      $('.parallax-bg').jarallax({
        speed: 0.5
      });
    }
  };
  // END: Parallax

  // BEGIN: 13 Contact Form
  var form = $('.contact-form');
  var message = $('.contact-msg');
  var form_data;

  // Success function
  function done_func(response) {
    message.fadeIn().removeClass('alert-danger').addClass('alert-success');
    message.text(response);
    setTimeout(function () {
      message.fadeOut();
    }, 50000);
    form.find('input:not([type="submit"]), textarea').val('');
  }

  // fail function
  function fail_func(data) {
    message.fadeIn().removeClass('alert-success').addClass('alert-danger');
    message.text(data.responseText);
    setTimeout(function () {
      message.fadeOut();
    }, 5000);
  }

  form.submit(function (e) {
    e.preventDefault();
    form_data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      data: form_data
    })
      .done(done_func)
      .fail(fail_func);
  });
  // END: Contact Form

  // BEGIN: 14 IE Detection
  /**
   * detect IE
   * returns version of IE or false, if browser is not Internet Explorer
   */
  (function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      var ieV = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      document.querySelector('body').className += ' ie-browser';
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      document.querySelector('body').className += ' ie-browser';
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // IE 12 (aka Edge) => return version number
      var ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      document.querySelector('body').className += ' ie-browser';
    }

    // other browser
    return false;
  })();
  // END: IE Detection

  // BEGIN: 15 Mega Menu
  $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');

    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
      $('.dropdown-submenu .show').removeClass("show");
    });

    return false;
  });

  // END: Mega Menu

  // Initialze all functions

  $(window).on('scroll', function () {
    stickyBar();
  });

  //Document ready functions
  $(document).ready(function () {
    CountTo.init();
    swiperSlider();
    wow();
    fullWithvideo();
    jarallax();
  });

})(jQuery);

// index.js
/**
 * Main JS file for Index behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
  "use strict";

  $(document).ready(function() {
    var $postContent = $('main#content');
    $postContent.fitVids();

    /** Move to Top **/
    $(window).scroll(function() {
        if($(this).scrollTop() !== 0) {
        $(".toTop").fadeIn();
        } else {
        $(".toTop").fadeOut();
        }
    });
    $('.toTop').arctic_scroll();

    /** Move to Content **/
    $('a.scroll-down').arctic_scroll();


    /** Drawer open or close **/
    $('.menu-button, .nav-close').on('click', function(event) {
      event.preventDefault();
      $('body').toggleClass('nav-closed nav-opened');
    });


    /**
    * JS: Affix
    */
    if ($("#navigation").length){
      $("#navigation").affix({
        offset: {
          top: $('#content').offset().top-20,
          bottom: function () {
            return (this.bottom = $('footer.site-footer').outerHeight(true));
          }
        }
      });
    }

    if ($("#share").length){
      $("#share").affix({
        offset: {
          top: $('#post-container').offset().top-20,
          bottom: function () {
            return (this.bottom = $('footer.site-footer').outerHeight(true));
          }
        }
      });
    }


    /**
    * JS: Progress bar
    */

    $(window).scroll(function () {
      if ($("#progressbar").length){
          var s = $(window).scrollTop(),
          d = $(document).height(),
          c = $(window).height(),
          e = $(".post-footer").height(),
          f = parseInt($(".post-footer").css("margin-top")) + parseInt($(".post-footer").css("padding-top")),
          g = $(".site-footer").height(),
          h = parseInt($(".site-footer").css("margin-top")) + parseInt($(".site-footer").css("padding-top")),
          i = $("#disqus_thread").height();

          var scrollPercent = (s / (d-c-e-f-g-h-i)) * 100;
          scrollPercent = Math.round(scrollPercent);

          if (c >= (d-e-f-g-h-i)) {
            scrollPercent = 100;
          } else if (scrollPercent < 0) {
            scrollPercent = 0;
          } else if (scrollPercent > 100) {
            scrollPercent = 100;
          }
          $("#progressbar").css("width", scrollPercent + "%");
          $("#progressbar-value").html(scrollPercent + "%");
      }

    });
  });

  // jQuery Plugins

  // Arctic Scroll by Paul Adam Davis
  // https://github.com/PaulAdamDavis/Arctic-Scroll
  $.fn.arctic_scroll = function (options) {
    var defaults = {
        elem: $(this),
        speed: 500
    },

    allOptions = $.extend(defaults, options);

    allOptions.elem.click(function (event) {
        event.preventDefault();
        var $this = $(this),
            $htmlBody = $('html, body'),
            offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
            position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
            toMove;

        if (offset) {
            toMove = parseInt(offset);
            $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
        } else if (position) {
            toMove = parseInt(position);
            $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
        } else {
            $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
        }
    });
  };
})(jQuery);

'use strict';


(function($, window, document) {
  var alreadyClicked = false
  
  $(function() {
    $('body').removeClass('fade-out-content')

    /* SVG to PNG if browser does not support it */
    if (!Modernizr.svg) {
      $('img[src*="svg"]').attr('src', function() {
        return $(this).attr('src').replace('.svg', '.png')
      })
    }

    /* Handle internal link clicks */
    $(document).on('click touch', '.internal-link', function(e) {
      e.preventDefault()
      var $that = $(this),
          targetLink = $(this).attr('href'),
          currentPage = window.location.pathname
      

      if (currentPage != '/' && currentPage.slice(-1) == '/') {
        currentPage = currentPage.slice(0, currentPage.length - 1)
      }

      if (!alreadyClicked && currentPage != targetLink) {
        $('.menu-wrapper a.active').removeClass('active')
        $(this).addClass('active')

        if ($(window).scrollTop() != 0) {
          goTo($that.attr('href'), 300)
        }

        else {
          goTo($that.attr('href'), 0)
        }
      }
    })

    $(document).bind('keydown', 'ctrl+; meta+; ', function() {
      $('html').toggleClass('grid-enabled')
    })
  })

  function goTo(url, duration) {
    $('html, body').velocity(
      "scroll", { 
        duration: duration,
        easing: 'easeOutSine',
        complete: function() {
          $('body').addClass('fade-out-content')

          $('.main-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            alreadyClicked = true
            window.location.href = url
          })
        }
      }
    )
  }

}(window.jQuery, window, document))
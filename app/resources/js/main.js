'use strict';

$('body').css('display', 'none')
if (!$.cookie('daanscholtennlaccess')) {
  var getAccess = prompt("Deze site is onder constructie en is afgesloten voor publiek.", "")
  if (getAccess == 'abracadabra') {
    $.cookie('daanscholtennlaccess', 'granted')
    $('body').css('display', 'block')
  }
  else {
    window.close()
  }
}
else {  
  $('body').css('display', 'block')
}

var isSafari = /constructor/i.test(window.HTMLElement);
if (isSafari) {
  $('body').addClass('is-safari')
}

(function($, window, document) {
  var alreadyClicked = false

  $(function() {
    /* Fade in content */
    setTimeout(function() {
      $('body').removeClass('fade-out-content')
    }, 40)

    /* SVG to PNG if browser does not support it */
    if (!Modernizr.svg) {
      $('img[src*="svg"]').attr('src', function() {
        return $(this).attr('src').replace('.svg', '.png')
      })
    }

    /* Open external links in new tabs */
    $(document.links).filter(function() {
      return this.hostname != window.location.hostname
    }).attr('target', '_blank')

    /* Handle internal link clicks */
    $(document).on('click touch', 'a[target!=_blank]', function(e) {
      e.preventDefault()
      var $that = $(this),
          targetLink = $(this).attr('href'),
          targetLinkCategory,
          currentPage = window.location.pathname
      

      if (currentPage != '/' && currentPage.slice(-1) == '/') {
        currentPage = currentPage.slice(0, currentPage.length - 1)
      }

      targetLinkCategory = '/' + targetLink.split('/')[1]

      if (!alreadyClicked && currentPage != targetLink) {
        var $menu = $('.menu-wrapper')
        $menu.find('a[href="' + targetLinkCategory + '"]').addClass('active')
        $menu.find('a[href!="' + targetLinkCategory + '"]').removeClass('active')

        if ($(window).scrollTop() != 0) {
          goTo($that.attr('href'), 300)
        }

        else {
          goTo($that.attr('href'), 0)
        }
      }
    })

    /* Blog post click handler */
    $('.blog .older-posts .post, .home .latest-posts .post').one('click touch', function(e) {
      $(this).find('header a[target!=_blank]').click()
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

/* AddThis stuff */
function addthisReady() {
  jQuery('body').addClass('addthis-ready')
}

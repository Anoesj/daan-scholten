'use strict';

var ds = window.ds
var twigTemplates = {}

// TEMPORARY ACCESS BULLSHIT
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
// END OF TEMPORARY ACCESS BULLSHIT

/* Safari only JavaScript hack */
var isSafari = /constructor/i.test(window.HTMLElement)
if (isSafari) {
  $('body').addClass('is-safari')
}

(function($, window, document) {
  var menuItemHasBeenClicked = false

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

    /* Sticky menu */
    function refreshMenuPosition() {
      menuPosition = $('.menu-wrapper').offset().top
    }

    function stickyMenuState() {
      (($(window).scrollTop() + 1) > menuPosition) ? $('body').addClass('menu-fixed').removeClass('menu-static') : $('body').addClass('menu-static').removeClass('menu-fixed')
    }

    var menuPosition
    refreshMenuPosition()
    
    $(window).on('resize', refreshMenuPosition)
    $(window).on('scroll', stickyMenuState)

    /* Open external links in new tabs */
    $(document.links).filter(function() {
      var has_target = _.isString($(this).attr('target'))
      var is_external = this.hostname != window.location.hostname
      return is_external && !has_target
    }).attr('target', '_blank')

    /* Handle internal link clicks */
    $(document).on('click touch', 'a[target!=_blank]:not(.no-fade)', function(e) {
      e.preventDefault()
      var $that = $(this),
          targetLink = $(this).attr('href'),
          targetLinkCategory,
          currentPage = window.location.pathname,
          isAddThisLink = false
      
      if ($that.attr('class') && $that.attr('class').indexOf('addthis') > -1) {
        isAddThisLink = true
      }

      if (currentPage != '/' && currentPage.slice(-1) == '/') {
        currentPage = currentPage.slice(0, currentPage.length - 1)
      }

      targetLinkCategory = '/' + targetLink.split('/')[1]

      if (!menuItemHasBeenClicked && currentPage != targetLink && !isAddThisLink) {
        ($(window).scrollTop() != 0) ? ds.goTo(e, targetLinkCategory, $that.attr('href'), 300) : ds.goTo(e, targetLinkCategory, $that.attr('href'), 0)
      }
    })

    /* Blog post click handler */
    $('.blog .older-posts .post, .home .latest-posts .post').one('click touch', function(e) {
      $(this).find('header a[target!=_blank]').click()
    })    
  })

}(window.jQuery, window, document))

/* AddThis stuff */
function addthisReady() {
  jQuery('body').addClass('addthis-ready')
}


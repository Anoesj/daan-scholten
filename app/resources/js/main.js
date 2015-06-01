'use strict';

var ds = window.ds
var twigTemplates = {}

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

    ds.loadSCWidgetAPI()
    ds.loadPhotoslider()
    ds.loadLightbox()
    // ds.loadAddThis()

    /* SVG to PNG if browser does not support it */
    if (!Modernizr.svg) {
      $('img[src*="svg"]').attr('src', function() {
        return $(this).attr('src').replace('.svg', '.png')
      })
    }

    /* Sticky menu */
    function refreshMenuPosition() {
      $('.menu-wrapper-wrapper').css({
        'height': $('.menu-wrapper').height()
      })
      menuPosition = $('.header-wrapper').height()
    }

    function stickyMenuState() {
      (($(window).scrollTop() + 1) > menuPosition) ? $('body').addClass('menu-fixed').removeClass('menu-static') : $('body').addClass('menu-static').removeClass('menu-fixed')
    }

    function callRefreshMenuPosition() {
      window.requestAnimationFrame(refreshMenuPosition)
    }

    // Fix some css shit
    var menuPosition
    callRefreshMenuPosition()
    
    $(window).on('resize', function () {
      callRefreshMenuPosition()
      ds.delayUpdate()
    })

    $(window).on('scroll touchmove', stickyMenuState)
    stickyMenuState()

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

    // Show/hide mobile menu
    $(document).on('click touch', '.mobile-menu-icon', function(e) {
      $('body').toggleClass('mobile-menu-hidden mobile-menu-visible')
    })
  })

}(window.jQuery, window, document));


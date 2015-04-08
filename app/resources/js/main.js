'use strict';

window.ds = {}
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

/* Safari only JavaScript hack */
var isSafari = /constructor/i.test(window.HTMLElement);
if (isSafari) {
  $('body').addClass('is-safari')
}

(function($, window, document) {
  window.ds.goTo = function(e, targetLinkCategory, url, duration) {
    if (e.metaKey || e.ctrlKey) {
      window.open(url, '_blank')
      if ("activeElement" in document) document.activeElement.blur()
    }

    else {
      var $menu = $('.menu-wrapper')
      $menu.find('a[href="' + targetLinkCategory + '"]').addClass('active')
      $menu.find('a[href!="' + targetLinkCategory + '"]').removeClass('active')

      $('html, body').velocity(
        "scroll", { 
          duration: duration,
          easing: 'easeOutSine',
          complete: function() {
            $('body').addClass('fade-out-content')

            $('.main-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
              menuItemHasBeenClicked = true
              window.location.href = url
            })
          }
        }
      )
    }
  }

  window.ds.renderResults = function (template, type, data) {
    if (!twigTemplates[template]) {
      twigTemplates[template] = true
      twig.twig({
        id: template,
        href: '/' + type + '/' + template + '.html',
        async: false
      })
    }

    return twig.twig({ ref: template }).render(data)
  }

  window.ds.searchOnGitHub = function(term) {
    var path = 'blog/'
    $.getJSON('https://api.github.com/search/code?q=' + escape(term) + '+in%3Afile+repo%3ADaanScholten%2FDaanScholten.github.io+extension%3Ahtml+path%3A/' + path, function(data) {
      var items = []
      var matchingItems = []

      $.each(data.items, function(key, val) {
        if (val.path != path + 'index.html') {
          items.push('/' + val.path)
        }
      })
      
      $.each(items, function(key, val) {
        matchingItems.push(_.where(window.ds.allPosts, { "file": val }))
      })

      $.each(matchingItems[0], function(key, val) {
        console.log(window.ds.renderResults('blog_post', 'templates', val))
      })
    })
  }

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

      if (!menuItemHasBeenClicked && currentPage != targetLink) {
        if ($(window).scrollTop() != 0) {
          window.ds.goTo(e, targetLinkCategory, $that.attr('href'), 300)
        }

        else {
          window.ds.goTo(e, targetLinkCategory, $that.attr('href'), 0)
        }
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

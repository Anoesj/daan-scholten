window.ds = {}
var ds = window.ds;

(function($, window, document) {
  ds.goTo = function(e, targetLinkCategory, url, duration) {
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

  ds.searchOnGitHub = function(term) {
    var path = 'blog/'
    $.getJSON('https://api.github.com/search/code?q=' + escape(term) + '+in%3Afile+repo%3ADaanScholten%2FDaanScholten.github.io+extension%3Ahtml+path%3A/' + path, function(data) {
      var items = []
      var matchingItems = []

      $.each(data.items, function(key, val) {
        if (val.path != path + 'index.html') {
          items.push('/' + val.path)
        }
      })

      console.log(items)

      // IDEE: Laat Grunt previews bouwen van alle posts
      // Zet die bestandjes in mapje previews/
      // Preview voor /blog/ik-moet-poepen/index.html komt op /previews/ik-moet-poepen/index.html
      // Haal de HTML van de previews die getoond moeten worden op uit die bestandjes
    })
  }

  ds.contactFormPrintResult = function(formObj, text, type) {
    $('.contact-form-status', formObj).text(text)
    
    if (type == 'success') {
      formObj.removeClass('form-sending').removeClass('form-error').addClass('form-sent')
    }

    else {
      formObj.removeClass('form-sending').addClass('form-error')
    }
  }

  ds.loadAddThis = function() {
    $.ajax({
      url: '//s7.addthis.com/js/300/addthis_widget.js#pubid=daanscholtennl',
      dataType: 'script',
      cache: true, // otherwise will get fresh copy every page load
      success: function() {
        $('body').addClass('addthis-ready')
      }
    })
  }
}(window.jQuery, window, document))
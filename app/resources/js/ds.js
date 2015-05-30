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
      cache: true,
      success: function() {
        $('body').addClass('addthis-ready')
      }
    })
  }

  ds.loadLightbox = function() {
    $.extend(true, $.magnificPopup.defaults, {
      tClose: 'Sluiten',
      tLoading: 'Laden...',
      gallery: {
        tPrev: 'Vorige',
        tNext: 'Volgende',
        tCounter: '%curr% van %total%'
      },
      image: {
        tError: 'De afbeelding kon niet worden geladen.'
      },
      ajax: {
        tError: 'De inhoud kon niet worden geladen.'
      }
    })

    $('.lightbox').magnificPopup({
      delegate: 'figure',
      type: 'image',
      closeOnContentClick: false,
      closeBtnInside: false,
      showCloseBtn: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      gallery: {
        enabled: true
      },
      image: {
        verticalFit: true,
        titleSrc: function(item) {
          return ""
        }
      },
      zoom: {
        enabled: true,
        duration: 300,
        easing: 'ease-in-out',
        opener: function(element) {
          return element.find('img')
        }
      }
    })

    if ($('body').hasClass('slider-loaded')) {
      $.magnificPopup.instance.next = function() {
        ds.carousel.trigger('next.owl.carousel')
        $.magnificPopup.proto.next.call(this)
      }

      $.magnificPopup.instance.prev = function() {
        ds.carousel.trigger('prev.owl.carousel')
        $.magnificPopup.proto.prev.call(this)
      }
    }
  }

  ds.loadPhotoslider = function() {
    ds.carousel = $('.owl-carousel')
    ds.carousel.owlCarousel({
      loop: false,
      margin: 0,
      nav: false,
      singleItem : true,
      items: 1,
      lazyLoad: true,
      lazyFollow: false,
      mouseDrag: false,
      animateIn: 'zoomIn',
      animateOut: 'fadeOutDown',
      smartSpeed: 300,
      onInitialized: ds.sliderLoaded
    })
  }

  ds.sliderLoaded = function() {
    $('body').addClass('slider-loaded')
  }

  ds.fadeInTracks = function() {
    var timeout = 80,
        $tracks = $('.track', '.tracks')

    $tracks.each(function(index) {
      var $track = $(this)
      setTimeout(function() {
        $track.addClass('fade-in')
      }, (timeout * index))
    })
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

  ds.loadSCWidgetAPI = function() {
    // This doesn't help solving the problem
    // $.ajax({
    //   url: 'https://w.soundcloud.com/player/api.js',
    //   dataType: 'script',
    //   cache: true,
    //   success: function() {
    //     ds.player = SC.Widget('sc-player')
    //   }
    // })
  }

}(window.jQuery, window, document));


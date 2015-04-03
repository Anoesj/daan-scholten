'use strict';


(function($, window, document) {
  
  $(function() {
    /* SVG to PNG if browser does not support it */
    if (!Modernizr.svg) {
      $('img[src*="svg"]').attr('src', function() {
        return $(this).attr('src').replace('.svg', '.png');
      })
    }

    /* Handle internal link clicks */
    $(document).on('click touch', '.internal-link', function(e) {
      e.preventDefault()
      var targetLink = $(this).attr('href')
      console.log(targetLink)
    })
  })

}(window.jQuery, window, document))
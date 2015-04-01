$(document).ready(function() {
  $(function() {
    /* SVG to PNG if browser does not support it */
    if (!Modernizr.svg) {
      $('img[src*="svg"]').attr('src', function() {
        return $(this).attr('src').replace('.svg', '.png');
      })
    }
  })
})
// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Register the Angular module
var app;
(function(){
  app = angular.module('app', ['plangular'])
  .config(function(plangularConfigProvider){
    plangularConfigProvider.clientId = 'b4a382f16b1d7f1438296d68f66b04ed';
  })
  .directive('onLastRepeat', function() {
    return function(scope, element, attrs) {
      if (scope.$last) {
        setTimeout(function() {
          scope.$emit('onRepeatLast', element, attrs)
        }, 1)
      }
    }
  })
  .controller('fadeInWhenDone', function($scope) {
    $scope.$on('onRepeatLast', function(scope, element, attrs) {
      ds.fadeInTracks()
    })
  })
  .controller('trackArtwork', function($scope) {
    $scope.artwork = function(originalURL) {
      return originalURL.replace('large','t500x500')
    }
  })
})();

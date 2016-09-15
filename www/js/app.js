// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','ngCordova' ,'app.controllers', 'app.routes', 'app.directives','app.services',])

.run(function($ionicPlatform,$cordovaNativeAudio) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

      $cordovaNativeAudio
        .preloadSimple('end', 'src/End.mp3')
        .then(function (msg) {
          console.log(msg);
        }, function (error) {
          alert(error);
        });
      $cordovaNativeAudio
        .preloadSimple('menu', 'src/Menu.mp3')
        .then(function (msg) {
          console.log(msg);
        }, function (error) {
          alert(error);
        });
      $cordovaNativeAudio
        .preloadSimple('ok', 'src/Ok.mp3')
        .then(function (msg) {
          console.log(msg);
        }, function (error) {
          alert(error);
        });
      $cordovaNativeAudio
        .preloadSimple('wrong', 'src/Wrong.mp3')
        .then(function (msg) {
          console.log(msg);
        }, function (error) {
          alert(error);
        });

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
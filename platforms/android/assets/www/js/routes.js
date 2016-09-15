angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('mainTabs.author', {
    url: '/Tabs/Author',
    cache: false,
    views: {
      'tab1': {
        templateUrl: 'templates/author.html',
        controller: 'authorCtrl'
      }
    }
  })

  .state('mainTabs.game', {
    url: '/Tabs/Game',
    cache: false,
    views: {
      'tab2': {
        templateUrl: 'templates/game.html',
        controller: 'gameCtrl'
      }
    }
  })

  .state('mainTabs.leaderBoards', {
    url: '/Tabs/Leaderboards',
    cache: false,
    views: {
      'tab3': {
        templateUrl: 'templates/leaderBoards.html',
        controller: 'leaderBoardsCtrl'
      }
    }
  })

  .state('mainTabs', {
    url: '/Tabs',
    templateUrl: 'templates/mainTabs.html',
    abstract:true
  })

  .state('login', {
    url: '/Login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('results', {
    url: '/Results',
    cache: false,
    templateUrl: 'templates/results.html',
    controller: 'resultsCtrl'
  })

  .state('mainTabs.trivia', {
    url: '/Game/:pregId',
    cache: false,
    views: {
      'tab2': {
        templateUrl: 'templates/trivia.html',
        controller: 'triviaCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/Login')

  

});
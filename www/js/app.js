// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('plumberFinder', ['ionic', 'ngCordova', 'plumberFinder.controllers','plumberFinder.services','lbServices'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
      $timeout(function(){
                // $cordovaSplashscreen.hide();
      },2000);
  });
    
    $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading ...'
        })
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
        console.log('Loading ...');
        $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
    });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
        controller: 'IndexController'
      }
    }
  })

  .state('app.infoClient', {
      url: '/client-info',
      views: {
        'mainContent': {
          templateUrl: 'templates/info-client.html',
            controller: 'infoClientController'
        }
      }
    })

   .state('app.infoContractor', {
      url: '/contractor-info',
      views: {
        'mainContent': {
          templateUrl: 'templates/info-contractor.html',
            controller:'infoContractorController'
        }
      }
    })
   .state('app.registerClient', {
      url: '/client-register',
      cache:false,
      views: {
        'mainContent': {
          templateUrl: 'templates/register-client.html',
            controller:'RegisterClientController'
        }
      }
    })
   .state('app.registerContractor', {
      url: '/contractor-register',
      cache:false,
      views: {
        'mainContent': {
          templateUrl: 'templates/register-contractor.html',
            controller:'RegisterContractorController'
        }
      }
    })
   .state('app.loginClient', {
      url: '/client-login',
      cache:false,
      views: {
        'mainContent': {
          templateUrl: 'templates/login-client.html',
            controller:'LoginClientController'
        }
      }
    })
   .state('app.loginContractor', {
      url: '/contractor-login',
      cache:false,
      views: {
        'mainContent': {
          templateUrl: 'templates/login-contractor.html',
            controller:'LoginContractorController'
        }
      }
    })
    .state('app.userTypePage', {
      url: '/user-type-page',
      views: {
        'mainContent': {
          templateUrl: 'templates/user-type-page.html',
          controller: 'UserTypePageController'
        }
      }
    })
    .state('app.userTypeLogin', {
      url: '/user-type-login',
      views: {
        'mainContent': {
          templateUrl: 'templates/user-type-login.html',
          controller: 'UserTypeLoginController'
        }
      }
    })
    .state('app.client', {
      url: '/clients/:id',
      views: {
        'mainContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ClientController'
        }
      }
    })
    .state('app.contractor', {
      url: '/contractors/:id',
      views: {
        'mainContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ContractorController'
        }
      }
    })
    .state('app.myJobs', {
      url: '/jobs',
      views: {
        'mainContent': {
          templateUrl: 'templates/jobs.html',
          controller: 'MyJobsController'
        }
      }
    })

  .state('app.findJob', {
    url: '/find-job',
    cache:false,
    views: {
      'mainContent': {
        templateUrl: 'templates/job-find.html',
        controller: 'FindJobController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

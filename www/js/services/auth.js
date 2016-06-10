'use strict';

angular
  .module('plumberFinder.services',[])
  .constant("baseURL", "http://plumberfinder.eu-gb.mybluemix.net/api/")
  .factory('AuthClientService', ['Client', '$q', '$rootScope', '$ionicPopup', 
    function(Client, $q, $rootScope, $ionicPopup) {
    function login(loginData) {
      return Client
        .login(loginData)
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            username: loginData.username,
            type: 'clients'
          };
          $rootScope.$broadcast('loginClient:Successful');
        },
        function(response){

              var message = '<div><p>' +  response.data.error.message + 
                  '</p><p>' + response.data.error.name + '</p></div>';
            
               var alertPopup = $ionicPopup.alert({
                    title: '<h4>Login Failed!</h4>',
                    template: message
                });

                alertPopup.then(function(res) {
                    console.log('Login Failed!');
                });
        });
    }
      
    function isAuthenticated() {
        if ($rootScope.currentUser) {
            return true;
        }
        else{
            return false;
        }
    }
      
    function getUser() {
        return $rootScope.currentUser;
    }
      
    function getUsername() {
        return $rootScope.currentUser.username;
    }
      
    function getUserId() {
        return $rootScope.currentUser.id;
    }
      
    function getUserType() {
        return 'clients';
    }

    function logout() {
      return Client
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }

    function register(registerData) {
      return Client
        .create({
         username: registerData.username,
         email: registerData.username,
         password: registerData.password,
         firstname: registerData.firstname,
         lastname: registerData.lastname,
         phone: registerData.phone,
         type: 'clients'
       })
       .$promise
      .then (function(response) {
          
        },
        function(response){
            
              var message = '<div><p>' +  response.data.err.message + 
                  '</p><p>' + response.data.err.name + '</p></div>';
            
               var alertPopup = $ionicPopup.alert({
                    title: '<h4>Registration Failed!</h4>',
                    template: message
                });

                alertPopup.then(function(res) {
                    console.log('Registration Failed!');
                });

        });
    }

    return {
      login: login,
      logout: logout,
      register: register,
      isAuthenticated: isAuthenticated,
      getUser: getUser,
      getUsername: getUsername,
      getUserId: getUserId,
      getUserType: getUserType
    };
  }])
  .factory('AuthContractorService', ['Contractor', '$q', '$rootScope', '$ionicPopup', 
    function(Contractor, $q, $rootScope, $ionicPopup) {
    function login(loginData) {
      return Contractor
        .login(loginData)
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            username: loginData.username,
            type: 'contractors'
          };
          $rootScope.$broadcast('loginContractor:Successful');
        },
        function(response){

              var message = '<div><p>' +  response.data.error.message + 
                  '</p><p>' + response.data.error.name + '</p></div>';
            
               var alertPopup = $ionicPopup.alert({
                    title: '<h4>Login Failed!</h4>',
                    template: message
                });

                alertPopup.then(function(res) {
                    console.log('Login Failed!');
                });
        });
    }
      
    function isAuthenticated() {
        if ($rootScope.currentUser) {
            return true;
        }
        else{
            return false;
        }
    }
      
    function getUser() {
        return $rootScope.currentUser;
    }
      
    function getUsername() {
        return $rootScope.currentUser.username;
    }
      
    function getUserId() {
        return $rootScope.currentUser.id;
    }
      
    function getUserType() {
        return 'contractors';
    }

    function logout() {
      return Contractor
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
       });
    }

    function register(registerData) {
      return Contractor
        .create({
         username: registerData.username,
         email: registerData.username,
         password: registerData.password,
         firstname: registerData.firstname,
         lastname: registerData.lastname,
         phone: registerData.phone,
         type: 'contractors'
       })
       .$promise
      .then (function(response) {
          
        },
        function(response){
            
              var message = '<div><p>' +  response.data.err.message + 
                  '</p><p>' + response.data.err.name + '</p></div>';
            
               var alertPopup = $ionicPopup.alert({
                    title: '<h4>Registration Failed!</h4>',
                    template: message
                });

                alertPopup.then(function(res) {
                    console.log('Registration Failed!');
                });

        });
    }

    return {
      login: login,
      logout: logout,
      register: register,
      isAuthenticated: isAuthenticated,
      getUser: getUser,
      getUsername: getUsername,
      getUserId: getUserId,
      getUserType: getUserType
    };
  }])

.factory('clientFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "clients/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('contractorFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "contractors/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('jobFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "jobs/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('reviewFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "reviews", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    }
}])
;

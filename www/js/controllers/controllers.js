angular.module('plumberFinder.controllers', [])

.controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaImagePicker, AuthClientService, AuthContractorService, $location, jobFactory) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    $scope.reservation = {};
    $scope.registration = {};
    $scope.job = {};
    $scope.loggedIn = false;
    $scope.username = '';
    $scope.userId = '';
    $scope.userType = '';
    
    if(AuthClientService.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthClientService.getUsername();
        $scope.userId = AuthClientService.getUserId();
        $scope.userType = AuthClientService.getUserType();
    } else if(AuthContractorService.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthClientService.getUsername();
        $scope.userId = AuthClientService.getUserId();
        $scope.userType = AuthClientService.getUserType();
    }

    $scope.isClientType = function() {
        if ($scope.userType.toLowerCase() == 'clients') {
            return true;
        } else {
            return false;
        }
    };
    
    $scope.isContractorType = function() {
        if ($scope.userType.toLowerCase() == 'contractors') {
            return true;
        } else {
            return false;
        }
    };
    
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login-client.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalLoginClient = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLoginClient = function () {
        $scope.modalLoginClient.hide();
    };

    // Open the login modal
    $scope.loginClient = function () {
        $scope.modalLoginClient.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLoginClient = function () {
        console.log('Doing client login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);

        AuthClientService.login($scope.loginData);

        $scope.closeLoginClient();
    };
    
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login-contractor.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalLoginContractor = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLoginContractor = function () {
        $scope.modalLoginContractor.hide();
    };

    // Open the login modal
    $scope.loginContractor = function () {
        $scope.modalLoginContractor.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLoginContractor = function () {
        console.log('Doing contractor login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);

        AuthContractorService.login($scope.loginData);

        $scope.closeLoginContractor();
    };
    
    $scope.logOutClient = function() {
        AuthClientService.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.userId = '';
        $scope.userType = '';
    };
    
    $scope.logOutContractor = function() {
        AuthContractorService.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.userId = '';
        $scope.userType = '';
    };
      
    $rootScope.$on('loginClient:Successful', function () {
        $scope.loggedIn = AuthClientService.isAuthenticated();
        $scope.username = AuthClientService.getUsername();
        $scope.userId = AuthClientService.getUserId();
        $scope.userType = AuthClientService.getUserType();

        $location.path('/app/' + $scope.userType.toLowerCase() + '/' + $scope.userId);
    });
      
    $rootScope.$on('loginContractor:Successful', function () {
        $scope.loggedIn = AuthContractorService.isAuthenticated();
        $scope.username = AuthContractorService.getUsername();
        $scope.userId = AuthContractorService.getUserId();
        $scope.userType = AuthContractorService.getUserType();

        $location.path('/app/' + $scope.userType.toLowerCase() + '/' + $scope.userId);
    });

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register-client.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalRegisterClient = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeRegisterClient = function () {
        $scope.modalRegisterClient.hide();
    };

    // Open the login modal
    $scope.registerClient = function () {
        $scope.modalRegisterClient.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doRegisterClient = function () {
        console.log('Doing client registration', $scope.registration);
        $scope.loginData.username = $scope.registration.username;
        $scope.loginData.password = $scope.registration.password;
        $scope.loginData.firstname = $scope.registration.firstname;
        $scope.loginData.lastname = $scope.registration.lastname;
        $scope.loginData.phone = $scope.registration.phone;

        AuthClientService.register($scope.registration);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeRegisterClient();
        }, 1000);
    };
       
    $rootScope.$on('registrationClient:Successful', function () {
        $localStorage.storeObject('userinfo',$scope.loginData);
    });

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register-contractor.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalRegisterContractor = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeRegisterContractor = function () {
        $scope.modalRegisterContractor.hide();
    };

    // Open the login modal
    $scope.registerContractor = function () {
        $scope.modalRegisterContractor.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doRegisterContractor = function () {
        console.log('Doing contractor registration', $scope.registration);
        $scope.loginData.username = $scope.registration.username;
        $scope.loginData.password = $scope.registration.password;
        $scope.loginData.firstname = $scope.registration.firstname;
        $scope.loginData.lastname = $scope.registration.lastname;
        $scope.loginData.phone = $scope.registration.phone;

        AuthContractorService.register($scope.registration);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeRegisterContractor();
        }, 1000);
    };
       
    $rootScope.$on('registrationContractor:Successful', function () {
        $localStorage.storeObject('userinfo',$scope.loginData);
    });

    $ionicModal.fromTemplateUrl('templates/job-create.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalCreateJob = modal;
    });

    $scope.closeCreateJob = function () {
        $scope.modalCreateJob.hide();
    };

    $scope.createJob = function () {
        $scope.modalCreateJob.show();
    };

    $scope.doCreateJob = function () {
        $scope.job.clientId=$scope.userId;
        console.log('Creating a job', $scope.job);

        jobFactory.save($scope.job);
        
        $scope.modalCreateJob.hide();

        $location.path('/app/jobs');
    };
})

.controller('IndexController', ['$scope', function ($scope) {    

}])

.controller('UserTypePageController', ['$scope', function ($scope) {    

}])

.controller('UserTypeLoginController', ['$scope', function ($scope) {    

}])

.controller('infoContractorController', ['$scope', function ($scope) {

}])

.controller('infoClientController', ['$scope', '$ionicModal', '$timeout', function ($scope, $ionicModal, $timeout) {

}])

.controller('ClientController', ['$scope', '$stateParams', 'clientFactory', 'contractorFactory', 'reviewFactory', function ($scope, $stateParams, clientFactory, contractorFactory, reviewFactory) {

    $scope.user = {};

    $scope.user = clientFactory.get({
        id: $stateParams.id
    })
    .$promise.then(
        function (user) {
            console.log(user);

            reviewFactory.query({"filter": {"where": {"type": 'contractor2client', "clientId": $stateParams.id}}}, function (reviews) {
                user.rating = 0;

                var reviewRatingCount = reviews.length;
                var reviewRatingSumm = 0;

                angular.forEach(reviews, function (review) {
                    reviewRatingSumm += review.privateRating;

                    contractorFactory.get({ id: review.contractorId }, function (contractor) {
                    
                            if ( review.user === undefined ) {
                                review.user = {};
                            }
                            review.user = contractor;
                        
                    });
                });

                user.reviews = reviews;

                if (reviewRatingCount > 0) {
                    user.rating = parseInt((reviewRatingSumm / reviewRatingCount) * 10);

                    if (user.rating >= 80) {
                        user.ratingClass = 'green';
                    } else if (user.rating >= 50 && user.rating < 80) {
                        user.ratingClass = 'yellow';
                    } else if (user.rating > 0 && user.rating < 50) {
                        user.ratingClass = 'red';
                    }                    

                    user.rating = user.rating + ' %';
                }

                $scope.user = user;
            });
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

}])

.controller('ContractorController', ['$scope', '$stateParams', 'clientFactory', 'contractorFactory', 'reviewFactory', function ($scope, $stateParams, clientFactory, contractorFactory, reviewFactory) {

    $scope.user = {};

    $scope.user = contractorFactory.get({
        id: $stateParams.id
    })
    .$promise.then(
        function (user) {
            console.log(user);

            reviewFactory.query({"filter": {"where": {"type": 'client2contractor', "contractorId": $stateParams.id}}}, function (reviews) {
                user.rating = 0;

                var reviewRatingCount = reviews.length;
                var reviewRatingSumm = 0;

                angular.forEach(reviews, function (review) {
                    reviewRatingSumm += review.privateRating;

                    clientFactory.get({ id: review.clientId }, function (client) {
                    
                            if ( review.user === undefined ) {
                                review.user = {};
                            }
                            review.user = client;
                        
                    });
                });

                user.reviews = reviews;

                if (reviewRatingCount > 0) {
                    user.rating = parseInt((reviewRatingSumm / reviewRatingCount) * 10);

                    if (user.rating >= 80) {
                        user.ratingClass = 'green';
                    } else if (user.rating >= 50 && user.rating < 80) {
                        user.ratingClass = 'yellow';
                    } else if (user.rating > 0 && user.rating < 50) {
                        user.ratingClass = 'red';
                    }                    

                    user.rating = user.rating + ' %';
                }

                $scope.user = user;
            });
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

}])

.controller('MyJobsController', ['$scope', 'AuthClientService', 'AuthContractorService', 'jobFactory', 'clientFactory', 'contractorFactory', 'reviewFactory', '$ionicModal', function ($scope, AuthClientService, AuthContractorService, jobFactory, clientFactory, contractorFactory, reviewFactory, $ionicModal) {

    if (AuthClientService.getUser()) {
        var user = AuthClientService.getUser();
    } else if (AuthContractorService.getUser()) {
        var user = AuthContractorService.getUser();
    }
    var userId = user.id;
    $scope.userId = userId;
    $scope.userType = user.type.toLowerCase();
    $scope.jobs = [];

    if ($scope.userType == 'clients') {
        jobFactory.query({"filter": {"where": {"clientId": userId}}}, function (jobs) {
            angular.forEach(jobs, function (job) {
                if (job.contractorId) {
                    contractorFactory.get({ id: job.contractorId }, function (contractor) {
                        if ( job.contractor === undefined ) {
                            job.contractor = {};
                        }
                        job.contractor = contractor;
                        // console.log(jobs);
                        reviewFactory.query({"filter": {"where": {"type": "client2contractor", "jobId": job.id, "clientId": $scope.userId}}}, function (review) {
                            console.log(review);

                            job.review = review[0];

                            $scope.jobs.push(job);

                        });
                    });
                } else {
                        // console.log(jobs);
                        $scope.jobs.push(job);                   
                }
            });
        });
    } else if ($scope.userType == 'contractors') {        
        jobFactory.query({"filter": {"where": {"contractorId": userId}}}, function (jobs) {
            angular.forEach(jobs, function (job) {
                    clientFactory.get({ id: job.clientId }, function (client) {
                        if ( job.client === undefined ) {
                            job.client = {};
                        }
                        job.client = client;
                        // console.log(jobs);
                        reviewFactory.query({"filter": {"where": {"type": "contractor2client", "jobId": job.id, "contractorId": $scope.userId}}}, function (review) {
                            console.log(review);

                            job.review = review[0];

                            $scope.jobs.push(job);
                        });
                    });
            });
        });
    }

    $ionicModal.fromTemplateUrl('templates/review.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalReview = modal;
    });

    $scope.closeReview = function () {
        $scope.modalReview.hide();
    };

    $scope.giveReview = function (fromUserId, toUserId, jobId) {
        $scope.fromUserId = fromUserId;
        $scope.toUserId = toUserId;
        $scope.jobId = jobId;

        $scope.modalReview.show($scope);
    };

    $scope.doGiveReview = function () {
        $scope.review = {
            privateRating: 10,
            publicRating: 5,
            comment: "",
            jobId: $scope.jobId
        };

        if (AuthClientService.getUser()) {
            var user = AuthClientService.getUser();
        } else if (AuthContractorService.getUser()) {
            var user = AuthContractorService.getUser();
        }
        $scope.userType = user.type.toLowerCase();

        if ($scope.userType.toLowerCase() == 'clients') {
            $scope.review.type = 'client2contractor';
            $scope.review.clientId = $scope.fromUserId;
            $scope.review.contractorId = $scope.toUserId;
        } else if ($scope.userType.toLowerCase() == 'contractors') {
            $scope.review.type = 'contractor2client';
            $scope.review.clientId = $scope.toUserId;
            $scope.review.contractorId = $scope.fromUserId;
        }

        $scope.doCreateReview = function () {
            console.log($scope.review);
            reviewFactory.save($scope.review);

            $scope.modalReview.hide();

            $state.go($state.current, {}, {reload: true});
        }; 
    };

}])

.controller('FindJobController', ['$scope', 'jobFactory', 'clientFactory', '$ionicModal', 'AuthClientService', 'AuthContractorService', '$location', function ($scope, jobFactory, clientFactory, $ionicModal, AuthClientService, AuthClientService, $location) {

    if (AuthClientService.getUser()) {
        var user = AuthClientService.getUser();
    } else if (AuthContractorService.getUser()) {
        var user = AuthContractorService.getUser();
    }

    $scope.userId = user.id;
    $scope.jobs = [];

    jobFactory.query(function (jobs) {                 
        angular.forEach(jobs, function (job) {
            if (!job.contractorId) {
                clientFactory.get({ id: job.clientId }, function (client) {
                    
                        if ( job.client === undefined ) {
                            job.client = {};
                        }
                        job.client = client;
                        console.log(jobs);
                        $scope.jobs.push(job);
                    
                });
            }    
        });    
    });

    $ionicModal.fromTemplateUrl('templates/job-contact.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modalContact = modal;
    });

    $scope.closeContact = function () {
        $scope.modalContact.hide();
    };

    $scope.jobContact = function (jobId) {
        $scope.jobId = jobId;
        $scope.modalContact.show();
    };

    $scope.doContact = function () {
        $scope.job.contractorId=$scope.userId;
        
        console.log('Contact', $scope.job, $scope.jobId);

        jobFactory.update({id: $scope.jobId}, {contractorId: $scope.job.contractorId, message: $scope.job.message}, function() {  
            $scope.modalContact.hide();
            $location.path('/app/jobs');
        });  
    };

}])

;
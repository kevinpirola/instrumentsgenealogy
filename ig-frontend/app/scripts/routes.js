'use strict';


angular.module('igFrontendApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: '$ctrl'
            })
            .when('/instruments', {
                templateUrl: 'views/instruments.html',
                controller: 'InstrumentsCtrl',
                controllerAs: '$ctrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: '$ctrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
'use strict';


angular.module('igFrontendApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
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
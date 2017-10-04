'use strict';


angular.module('admin.igFrontendApp')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/admin/main.html',
                controller: 'AdminMainCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    data: function (User) {
                        return User.get();
                    }
                }
            })
            .when('/login', {
                templateUrl: 'views/admin/login.html',
                controller: 'AdminLoginCtrl',
                controllerAs: 'ctrl'
            })
            .when('/upload/:db?', {
                templateUrl: 'views/admin/upload.html',
                controller: 'AdminUploadCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    data: function (User) {
                        return User.get();
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
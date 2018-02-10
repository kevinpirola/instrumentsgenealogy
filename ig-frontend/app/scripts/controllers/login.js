'use strict';

/**
 * @ngdoc function
 * @name igFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the igFrontendApp
 */
angular.module('igFrontendApp')
    .controller('LoginCtrl', ['Login', '$cookies', 'toaster', '$location', function (Login, $cookies, toaster, $location) {
        var self = this;
        self.login = function () {
            Login.login(self.email,
                self.password,
                function (data) {
                    if (!data.error) {
                        $cookies.put('IG_AUTH_COOKIE', data.hash);
                        $location.path('/');
                    }
                },
                function (err) {
                    toaster.pop({
                        type: 'error',
                        title: 'Login Error',
                        body: 'Login Error, ' + err.data.message
                    });
                }
            );
        };
    }]);
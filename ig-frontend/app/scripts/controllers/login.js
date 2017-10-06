'use strict';

/**
 * @ngdoc function
 * @name igFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the igFrontendApp
 */
angular.module('igFrontendApp')
    .controller('LoginCtrl', ['Login', '$cookies', function (Login, $cookies) {
        var self = this;
        self.login = function () {
            Login.login('gianmarco.laggia@gmail.com',
                'manugia33@@',
                function (data) {
                    if (!data.error) {
                        $cookies.put('IG_AUTH_COOKIE', data.hash);
                    }
                }
            );
        };
    }]);
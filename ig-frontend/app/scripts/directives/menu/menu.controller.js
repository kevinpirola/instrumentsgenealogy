'use strict';

angular.module('igFrontendApp')
    .controller('MenuCtrl', ['Login', '$location', '$scope', '$rootScope', '$cookies', '$log', 'toaster', 'Page', function (Login, $location, $scope, $rootScope, $cookies, $log, toaster, Page) {
        var self = this;
        
        self.isCurrentPage = function (page) {
            return Page.getPagePath() === page;
        };

        self.logged = true;
        
        /*********************/
        /*  LOGOUT FUNCTION  */
        /*********************/
        self.logout = function () {
            Login.logout(function () {
                // Success handler
                $scope.credentials = {
                    username: '',
                    password: ''
                };
                self.user = null;
                delete $cookies.JSESSIONID;
                $log.info('The user has been logged out!');
                toaster.pop('success', 'Logout', 'Logout effettuato con successo.');
                $rootScope.logged = false;
                $location.url('login');

            }, function (data, status, headers, config) {
                // Failure handler
                $log.error('Something went wrong while trying to logout... ', data, status, headers, config);
                toaster.pop('error', 'Logout', 'Impossibile effettuare il logout.');
            });
        };
}]);
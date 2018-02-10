'use strict';

angular.module('igFrontendApp')
    .component('userInfoBar', {
        templateUrl: 'scripts/components/user-info-bar/user-info-bar.component.html',
        controller: 'UserInfoBarController',
        controllerAs: '$ctrl'
    })
    .controller('UserInfoBarController', ['User', 'Login', '$route', '$scope', function(User, Login, $route, $scope) {
        var self = this;
        self.user = {};
        
        
        $scope.$on('$routeChangeSuccess', function() {
            self.getUser();
        });

        self.logout = function () {
            Login.logout(function() {
                self.getUser();
            });
        };
        
        self.getUser = function () {
            User.get(function(res){
                self.user = res;
            });
        };
        
        self.getUser();
    }]);
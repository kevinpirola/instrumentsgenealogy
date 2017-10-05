'use strict';

angular.module('igFrontendApp')
    .component('userInfoBar', {
        templateUrl: 'scripts/components/user-info-bar/user-info-bar.component.html',
        controller: 'UserInfoBarController',
        controllerAs: '$ctrl',
        bindings: {
            variable: '<'
        }
    })
    .controller('UserInfoBarController', ['User', function(User) {
        var self = this;
        
        User.get();

        self.someFunction = function() {
            
            return {};
        };
    }]);
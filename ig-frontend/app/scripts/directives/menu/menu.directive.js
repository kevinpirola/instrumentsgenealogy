'use strict';
angular.module('igFrontendApp')
    .directive('menu', [function () {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'scripts/directives/menu/menu.view.html',
            /*link: function ($scope) {
                $scope.isCurrentPage = function (page) {
                    return Page.getPagePath() === page;
                };
            },*/
            controller: 'MenuCtrl',
            controllerAs: '$ctrl'
        };
}]);
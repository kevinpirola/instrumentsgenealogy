'use strict';

angular.module('igFrontendApp')
    .component('user-info-bar', {
        transclude: true,
        bindings: {
            title: '@'
        },
        controller: function() {
            this.$onInit = function() {
                this.tabsCtrl.addPane(this);
                console.log(this);
            };
        },
        templateUrl: './user-info-bar.component.html'
    });
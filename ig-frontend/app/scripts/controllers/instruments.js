'use strict';

/**
* @ngdoc function
* @name igFrontendApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the igFrontendApp
*/
angular.module('igFrontendApp')
    .controller('InstrumentsCtrl', ['NgTableParams', 'Instruments', function (NgTableParams, Instruments) {
        var self = this;

        Instruments.query(function(data){
            self.tableParams = new NgTableParams({}, {
                dataset: data
            });
        });

    }]);

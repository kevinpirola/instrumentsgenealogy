'use strict';

/**
 * @ngdoc function
 * @name igFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the igFrontendApp
 */
angular.module('igFrontendApp')
  .controller('MainCtrl', ['NgTableParams', 'Instruments', function (NgTableParams, Instruments) {
    var self = this;
    
    self.tableParams = new NgTableParams({}, {
        getData: function(params){
            /*return executeQuery(params).then(function(data){
                params.total(data.inlineCount);
                return data.results;
            });*/
            console.log(params);
            return Instruments.query();
        }
        //dataset: data
    });

  }]);

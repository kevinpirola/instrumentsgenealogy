'use strict';
angular.module('igFrontendApp')
    .factory('Utils', [function () {
    	return {
    		find: function(arr, func){
    			if(typeof arr !== 'object'){
    				return undefined;
    			}
    			for(var i in arr){
    				if(func(arr[i])){
    					return arr[i];
    				}
    			}
    			return undefined;
    		}
    	};
    }]);
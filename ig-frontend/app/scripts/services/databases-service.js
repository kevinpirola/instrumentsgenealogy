'use strict';

angular.module('igFrontendApp')
    /**
        Wrapping class for the service that handles the databases.
        @param ENV is a constant, defined dynamic in config.js.
    */
    .factory('Databases', ['$resource', 'ENV', function ($resource, ENV) {
        var res = $resource(ENV.apiEndpoint + '/databases/:id', {
            id: '@id'
        }, {
            getDatabasesTotal: {
                method: 'GET',
                url: ENV.apiEndpoint + '/databases/totals',
                params: {
                    title: '@title',
                    typology: '@typology'
                },
                isArray: true
            }
        });
        
        var databasesCache = null;
        
        var prototype = {
        		api: res,
        		getDatabases : function(callback) {
        			if(databasesCache === null){
	                	res.query({}, function (dataset) {
	                		databasesCache = dataset;
	                        callback(dataset);
	                    }, function () {
	                        //ERROR HANDLING
	                    });
        			} else {
        				callback(databasesCache);
        			}
                }
        };
        
        return prototype;
    }]);
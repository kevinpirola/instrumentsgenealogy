'use strict';

angular.module('igFrontendApp')
    /**
        Wrapping class for the service that handles the databases.
        @param ENV is a constant, defined dynamic in config.js.
    */
    .factory('Instruments', ['$resource', 'ENV', function ($resource, ENV) {
        return $resource(ENV.apiEndpoint + '/AN01_INSTRUMENTS/:id', {
                id: '@id'
            },
            { 
                query: {
                    transformResponse: function(data) {
                        return angular.fromJson(data).AN01_INSTRUMENTS.records;
                    },
                    isArray: true
                }
            }
        );
    }]);
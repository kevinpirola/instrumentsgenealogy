'use strict';

angular.module('igFrontendApp')
    /**
        Wrapping class for the service that handles the databases.
        @param ENV is a constant, defined dynamic in config.js.
    */
    .factory('Categories', ['$resource', 'ENV', function ($resource, ENV) {
        return $resource(ENV.apiEndpoint + '/categories/:id', {
            id: '@id'
        }, {
            getForDb: {
                method: 'GET',
                url: ENV.apiEndpoint + '/categories/database/:id',
                params: {
                    id: '@id'
                },
                isArray: true
            },
            isJcr: {
                method: 'GET',
                url: ENV.apiEndpoint + '/categories/isJcr/:id',
                params: {
                    id: '@id'
                }
            }
        });
    }]);
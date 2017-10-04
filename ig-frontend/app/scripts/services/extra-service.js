'use strict';

angular.module('igFrontendApp')
    /**
        Wrapping class for the service that handles the databases.
        @param ENV is a constant, defined dynamic in config.js.
    */
    .factory('Extra', ['$resource', 'ENV', function ($resource, ENV) {
        return $resource(ENV.apiEndpoint + '/extras/:id', {
            id: '@id'
        }, {
            getExtraTotal: {
                method: 'GET',
                url: ENV.apiEndpoint + '/extras/totals',
                params: {
                    title: '@title',
                    typology: '@typology',
                    extra: '@extra'
                },
                isArray: true
            }
        });
    }]);
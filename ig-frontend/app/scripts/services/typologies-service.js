'use strict';

angular.module('igFrontendApp')
    /**
        Wrapping class for the service that handles the typologies.
        @param ENV is a constant, defined dynamic in config.js.
    */
    .factory('Typologies', ['$resource', 'ENV', function ($resource, ENV) {
        return $resource(ENV.apiEndpoint + '/typologies/:id', {
            id: '@id'
        }, {
            getTypologiesTotal: {
                method: 'GET',
                url: ENV.apiEndpoint + '/typologies/totals',
                params: {
                    title: '@title',
                    db: '@db'
                },
                isArray: true
            }
        });
    }]);
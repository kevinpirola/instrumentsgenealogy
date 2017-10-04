'use strict';

angular.module('igFrontendApp')
    /**
        Wrapping class for the service that handles the targets.
        @param ENV is a constant, defined dynamic in config.js.
    */
    .factory('User', ['$resource', 'ENV', function ($resource, ENV) {
        return $resource(ENV.apiEndpoint + '/user');
    }]);
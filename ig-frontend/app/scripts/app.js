'use strict';

/**
 * @ngdoc overview
 * @name igFrontendApp
 * @description
 * # igFrontendApp
 *
 * Main module of the application.
 */
angular
    .module('igFrontendApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'toaster',
        'config'
    ])
    .config(['$httpProvider', function ($httpProvider) {
        //Http Intercpetor to check auth failures for xhr requests
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
        //$httpProvider.defaults.withCredentials = true;
        // Tough luck: the default cookie-to-header mechanism is not working for cross-origin requests!
        $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN'; // The name of the cookie sent by the server
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'; // The default header name picked up by Spring Security
}]);
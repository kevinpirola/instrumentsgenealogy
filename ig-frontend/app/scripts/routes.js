'use strict';


angular.module('igFrontendApp')
    .config(['$httpProvider', function ($httpProvider) {
        //Http Intercpetor to check auth failures for xhr requests
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
        $httpProvider.defaults.withCredentials = true;
        // Tough luck: the default cookie-to-header mechanism is not working for cross-origin requests!
        $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN'; // The name of the cookie sent by the server
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'; // The default header name picked up by Spring Security
    }]);
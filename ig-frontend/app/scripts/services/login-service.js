'use strict';

angular.module('igFrontendApp')
    .factory('Login', ['$http',
                       '$resource',
                       'Cookies',
                       'ENV',
                       '$log',
                       function ($http, $resource, Cookies, ENV, $log) {

        var loginResources = $resource(ENV.apiEndpoint + '/auth/login', {}, {
            options: {
                method: 'OPTIONS',
                cache: false
            },
            post: {
                method: 'POST',
                cache: false
            }
        });

        var logoutResources = $resource(ENV.apiEndpoint + '/auth/logout', {}, {
            options: {
                method: 'OPTIONS',
                cache: false
            },
            post: {
                method: 'POST',
                cache: false
            }
        });

    /**
     * Tries to detect whether the response elements returned indicate an invalid or missing CSRF token...
     */
    var isCSRFTokenInvalidOrMissing = function (data, status) {
        return (status === 403 && data.message && data.message.toLowerCase().indexOf('csrf') > -1) || (status === 0 && data === null);
    };

    return {
        /**
         * Service function that logs in the user with the specified username and password.
         * To handle the returned promise we use a successHandler/errorHandler approach because we want to have
         * access to the additional information received when the failure handler is invoked (status, etc.).
         */
        login: function (username, password, successHandler, errorHandler) {
            // Obtain a CSRF token
            loginResources.options().$promise.then(function (/*response*/) {
                //$log.log('Obtained a CSRF token in a cookie', response);

                // Extract the CSRF token
                var csrfToken = Cookies.getFromDocument($http.defaults.xsrfCookieName);
                //$log.log('Extracted the CSRF token from the cookie', csrfToken);

                // Prepare the headers
                var headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
                headers[$http.defaults.xsrfHeaderName] = csrfToken;

                // Post the credentials for logging in
                //headers: headers
                loginResources.post(
                    {
                        username: username,
                        password: password
                    },
                    successHandler,
                    function (data, headers, status, config) {
                    if (isCSRFTokenInvalidOrMissing(data, status)) {
                        $log.error('The obtained CSRF token was either missing or invalid. Have you turned on your cookies?');

                    } else {
                        // Nope, the error is due to something else. Run the error handler...
                        errorHandler(data, status, headers, config);
                    }
                });

            }).catch(errorHandler
                /*function (response) {
                    $log.error('Could not contact the server... is it online? Are we?', response);
                }*/
            );
        },

        logout: function (successHandler, errorHandler) {

            // Obtain a CSRF token
            logoutResources.options().$promise.then(function (response) {
                $log.log('Obtained a CSRF token in a cookie', response);

                // Extract the CSRF token
                var csrfToken = Cookies.getFromDocument($http.defaults.xsrfCookieName);
                $log.log('Extracted the CSRF token from the cookie', csrfToken);

                // Prepare the headers
                var headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
                headers[$http.defaults.xsrfHeaderName] = csrfToken;

                // Post the credentials for logging out
//                $http.post(ENV.apiEndpoint + '/auth/logout', '', {
//                        headers: headers
//                    }, successHandler, 
//                    function (data, status, headers, config) {
//
//                        if (isCSRFTokenInvalidOrMissing(data, status)) {
//                            $log.error('The obtained CSRF token was either missing or invalid. Have you turned on your cookies?');
//                        } else {
//                            // Nope, the error is due to something else. Run the error handler...
//                            errorHandler(data, status, headers, config);
//                        }
//                    });
                logoutResources.post({}, successHandler, errorHandler);

            }).catch(errorHandler
                /*function (response) {
                                $log.error('Could not contact the server... is it online? Are we?', response);
                            }*/
            );
        }
    };
}]);
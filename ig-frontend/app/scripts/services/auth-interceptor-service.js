'use strict';

angular.module('igFrontendApp')
    .factory('authHttpResponseInterceptor', ['$q', '$location', '$rootScope', 'toaster', '$cookies', function ($q, $location, $rootScope, toaster, $cookies) {
        var errorServerDown = false;
        return {
            request: function(request) {
                console.log('cccccccccc');
                request.headers.Authorization = 'Basic ' + $cookies.get('IG_AUTH_COOKIE');
                return request;
            },
            response: function (response) {
                console.log('bbbbbbbbbb');
                if (response.status === 401) {
                    console.log('Response 401');
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                var returnTo = $location.path().replace(/^\/|\/$/g, '');

                if (rejection.status === -1) {
                    if (!errorServerDown) {
                        errorServerDown = true;
                        toaster.pop({
                            type: 'error',
                            title: 'Connection Error',
                            body: 'Server Down, connection refused',
                            onHideCallback: function () {
                                errorServerDown = false;
                            }
                        });
                        $location.path('/login').search('returnTo', returnTo);
                    }
                } else
                if (rejection.status === 401 && returnTo !== 'login') {
                    $rootScope.notLogged = true;
                    toaster.pop('error', 'Unauthorized Error', 'Errore di autenticazione o sessione scaduta. Effettuare nuovamente il login');
                    $location.path('/login').search('returnTo', returnTo);
                }
                return $q.reject(rejection);
            }
        };
    }]);
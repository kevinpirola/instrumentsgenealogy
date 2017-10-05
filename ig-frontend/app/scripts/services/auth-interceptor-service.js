'use strict';

angular.module('igFrontendApp')
    .factory('authHttpResponseInterceptor', ['$q', '$location', '$rootScope', 'toaster', function ($q, $location, $rootScope, toaster) {
        var errorServerDown = false;
        return {
            request: function(request) {
                console.log(request);
                request.headers.Authorization = 'Basic asdasdasdasd';
                //request.hash = $rootScope.hash;
                return request;
            },
            response: function (response) {
                if (response.status === 401) {
                    //console.log('Response 401');
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                $rootScope.hash = 'adasdasdas';
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
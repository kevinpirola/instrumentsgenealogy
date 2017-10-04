'use strict';

angular.module('igFrontendApp')
    /**
        Wrapping class for the service that handles the databases.
        @param ENV is a constant, defined dynamic in config.js.
    */
    .factory('Export', ['ENV', '$q', '$http', '$window', function (ENV, $q, $http, $window) {

        var prototype = {};

        var download = function (url, data, defaultFileName) {
            var deferred = $q.defer();
            $http.post(url, data, {
                responseType: 'arraybuffer'
            }).success(
                function (data, status, headers) {
                    var type = headers('Content-Type');
                    var disposition = headers('Content-Disposition');
                    if (disposition) {
                        var match = disposition.match(/.*filename=\"?([^;\"]+)\"?.*/);
                        if (match[1]) {
                            defaultFileName = match[1];
                        }
                    }
                    defaultFileName = defaultFileName.replace(/[<>:"\/\\|?*]+/g, '_');
                    var blob = new Blob([data], {
                        type: type
                    });
                    $window.saveAs(blob, defaultFileName);
                    deferred.resolve(defaultFileName);
                }).error(function () {
                var e = deferred.reject(e);
            });
            return deferred.promise;
        };

        prototype.downloadExportSearchResults = function (codes) {
            return download(ENV.apiEndpoint + '/exports/details', {
                codes: codes
            }, 'export.xls');
        };

        prototype.downloadExportDetails = function (id) {
            return ENV.apiEndpoint + '/exports/details/' + id + '.xls';
        };

        prototype.downloadExportSearchResultsIE = function (codes) {
            var def = $q.defer();
            var url = ENV.apiEndpoint + '/exports/ie/details';
            $http.post(url, codes, {
                responseType: 'text'
            }).success(function (data) {
                def.resolve(data);
            }).error(function (err) {
                def.reject(err);
            });
            return def.promise;
        };

        prototype.getApiEndpointForIEExport = function (token) {
            return ENV.apiEndpoint + '/exports/ie/details/' + token;
        };

        return prototype;
    }]);
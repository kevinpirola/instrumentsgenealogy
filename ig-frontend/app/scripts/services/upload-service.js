'use strict';

/**
    Service that wraps all the requests to the upload section of the REST services.
    TODO in the future maybe we can simplify the code using $resource
*/
angular.module('admin.igFrontendApp')
    .factory('Upload', ['$http', '$q', 'ENV', function ($http, $q, ENV) {
        return {
            upload: function (file, db, cat, index) {
                var def = $q.defer();
                var formData = new FormData();
                formData.append('file', file);
                var param = '';
                if (cat !== undefined && cat !== null) {
                    param = '?category=' + cat.code;
                }
                if (index !== undefined && index !== null){
                    param = '?index=' + index;
                }
                $http.post(ENV.apiEndpoint + '/uploads/' + db + param, formData, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).then(function (data) {
                    def.resolve(data);
                }, function (err) {
                    def.reject(err);
                });
                return def.promise; // so I can use "then" calling Upload.method()
            },
            canUpload: function (db) {
                var def = $q.defer();
                $http.get(ENV.apiEndpoint + '/uploads/' + db + '/canUpload').then(function (data) {
                    def.resolve(data);
                }, function (err) {
                    def.reject(err);
                });
                return def.promise;
            },
            getLastUploadData: function (db) {
                var def = $q.defer();
                $http.get(ENV.apiEndpoint + '/uploads/status/' + db).then(function (data) {
                    def.resolve(data);
                }, function (err) {
                    def.reject(err);
                });
                return def.promise;
            },
            resetDatabase: function (db) {
                var def = $q.defer();
                $http.delete(ENV.apiEndpoint + '/uploads/' + db).then(function (data) {
                    def.resolve(data);
                }, function (err) {
                    def.reject(err);
                });
                return def.promise;
            }
        };
            }]);
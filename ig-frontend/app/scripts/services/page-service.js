'use strict';

angular.module('igFrontendApp')
    .factory('Page', ['$location', function ($location) {
        var pages = {
            'upload/scopus': 'Upload File CSV Database SCOPUS',
            'upload/wos': 'Upload File CSV Database WOS',
            'upload/jcr': 'Upload File CSV Database JCR',
            'upload/anvur': 'Upload File CSV Database ANVUR',
            'upload/anvur-a': 'Upload File CSV Database ANVUR-A'
        };
        return {
            getRootPage: function () {
                //this regex removes trailing and leading slashes and trailing params (everything after the question mark)
                return $location.path().replace(/^\/|\/$|\?.*/g, '').split('/')[0];
            },
            getPagePath: function () {
                //this regex removes trailing and leading slashes and trailing params (everything after the question mark) /^\/|\/$|\?.*/g
                return $location.path().replace(/^\/|\/$|\?.*/g, '');
            },
            getPageName: function () {
                var pname = pages[this.getPagePath()];
                return pname === undefined ? 'Home' : pname;
            }
        };
	}]);
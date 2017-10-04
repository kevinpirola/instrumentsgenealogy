'use strict';

angular.module('igFrontendApp')
    .factory('Help', ['$window', function ($window) {

        var prototype = {
            helpStatus: false,
            helpOnType: '',
            helpOnTitle: '',
            boxVisible: false,

            setHelpStatus: function () {
                prototype.helpStatus = !prototype.helpStatus;
            },
            getHelpStatus: function () {
                return prototype.helpStatus;
            },

            setHelpOn: function (type, title) {
                prototype.helpOnType = type;
                prototype.helpOnTitle = title;
                prototype.boxVisible = true;
                var clientHeight = $window.maxHeight || document.documentElement.scrollHeight;
                if (clientHeight < $window.innerHeight) {
                    clientHeight = $window.innerHeight;
                }

                angular.element(document.querySelector('#underlay'))[0].style.height = clientHeight + 'px';

            },

            getHelpOnType: function () {
                return prototype.helpOnType;
            },

            getHelpOnTitle: function () {
                return prototype.helpOnTitle;
            },

            getBoxVisible: function () {
                return prototype.boxVisible;
            },

            closeBox: function () {
                prototype.boxVisible = false;
            },
        };

        return prototype;
    }]);

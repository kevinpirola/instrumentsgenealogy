'use strict';

angular.module('igFrontendApp')
    /**
        A service used to handle the pagination
    */
    .factory('Pagination', [function () {
        var prototype = {};

        prototype.forceReload = false;

        prototype.actualPage = 1;
        prototype.span = 50;
        prototype.total = null;

        prototype.maxPage = 1;

        prototype.viewablePages = [];
        prototype.viewableNumber = 3; //Only odd numbers

        prototype.recordsPerPage = [25, 50, 100];

        prototype.changeSpan = function (newSpan) {
            if (newSpan > 0) {
                prototype.span = newSpan;
                prototype.updateViewablePages();
            }
        };

        prototype.next = function () {
            var status = false;
            if (prototype.actualPage < prototype.maxPage) {
                prototype.actualPage++;
                status = true;
            }
            return status;
        };

        prototype.prev = function () {
            var status = false;
            if (prototype.actualPage > 1) {
                prototype.actualPage--;
                status = true;
            }
            return status;
        };

        prototype.goTo = function (page) {
            var status = false;
            if (page >= 1 && page <= prototype.maxPage) {
                prototype.actualPage = page;

                status = true;
            }
            return status;
        };

        prototype.getFrom = function () {
            return ((prototype.actualPage - 1) * prototype.span) + 1;
        };

        prototype.getTo = function () {
            return (prototype.actualPage * prototype.span);
        };

        prototype.resetPage = function () {
            prototype.actualPage = 1;
        };

        prototype.updateTotal = function (newTotal) {
            prototype.total = newTotal;
            prototype.maxPage = Math.ceil(prototype.total / prototype.span);
            prototype.updateViewablePages();
        };

        prototype.updateViewablePages = function () {
            prototype.viewablePages = [];
            var minLimit = Math.max(prototype.actualPage - ((prototype.viewableNumber - 1) / 2), 2);
            var maxLimit = Math.min(minLimit + prototype.viewableNumber - 1, prototype.maxPage - 1);
            var index = Math.max(maxLimit - prototype.viewableNumber + 1, 2);
            for (; index <= maxLimit; index++) {
                prototype.viewablePages.push(index);
            }
        };

        return prototype;
    }]);
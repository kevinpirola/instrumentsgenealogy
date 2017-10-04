'use strict';

angular.module('igFrontendApp')
    /*
        Wrapping class for the service that handles the journals (search and detail).
        @param ENV is a constant, defined dynamic in config.js.
    */
    .factory('Journals', ['$resource', 'ENV', '$route', 'Pagination', '$rootScope', 'Utils', function ($resource, ENV, $route, Pagination, $rootScope, Utils) {

        var res = $resource(ENV.apiEndpoint + '/journals/:id', {
            id: '@id',
            title: '@title',
            from: '@from',
            to: '@to',
            db: '@db',
            typology: '@typology',
            category: '@category',
            quartile: '@quartile',
            index: '@index'
        }, {
            getDatabases: {
                method: 'GET',
                url: ENV.apiEndpoint + '/journals/:id/databases/',
                params: {
                    id: '@id'
                },
                isArray: true
            },
            getScopusDetails: {
                method: 'GET',
                url: ENV.apiEndpoint + '/journals/:id/databases/scopus',
                params: {
                    id: '@id'
                }
            },
            getJcrDetails: {
                method: 'GET',
                url: ENV.apiEndpoint + '/journals/:id/databases/jcr',
                params: {
                    id: '@id'
                }
            },
            getWosDetails: {
                method: 'GET',
                url: ENV.apiEndpoint + '/journals/:id/databases/wos',
                params: {
                    id: '@id'
                }
            },
            getAnvurDetails: {
                method: 'GET',
                url: ENV.apiEndpoint + '/journals/:id/databases/anvur',
                params: {
                    id: '@id'
                }
            }
        });

        /*** DECLARE HERE THE AVAILABLE FILTERS ***/
        var filters = {
            db: [],
            typology: [],
            category: [],
            extra: [],
            quartile: [],
            index: []
        };
        var orderBy = 'TITLE';

        var maxCacheSize = 5;
        var cacheIndex = 0;
        
        var detailsCache = [];
        
        var checkCallback = function(counter, tot, callback){
            if(counter === tot && callback){
                callback();
            }
        };
        
        var prototype = {
            api: res,
            isJcr: 0,
            quartileSelected: '',
            previousTitle: [],
            loading: true,
            indexSelected: '',
            compareJournalsMax: 3,
            compareJournals: [],
            
            //PARAMS: filterName String, code Object
            addFilter: function (params) {
                var filterName = params.filterName;
                var code = params.code;
                var filter = filters[filterName];
                if (typeof filter === 'object') {
                    if (filter.indexOf(code) === -1) {
                        filter.push(code);
                        Pagination.resetPage();
                        if (filterName === 'db' && code === 3) {
                            prototype.isJcr++;
                        } else if (filterName === 'category') {
                            if (params.isJcr === true) {
                                prototype.isJcr = 1;
                            } else {
                                prototype.isJcr = 0;
                            }
                        }
                    }
                }
            },
            //PARAMS: filterName String, code Object
            removeFilter: function (params) {
                var filterName = params.filterName;
                var code = params.code;
                var filter = filters[filterName];
                if (typeof filter === 'object') {
                    if (filter.indexOf(code) > -1) {
                        filter.splice(filter.indexOf(code), 1);
                        Pagination.resetPage();
                        if (filterName === 'db' && code === 3) {
                            prototype.isJcr--;
                        }
                    }
                }
            },
            getFilters: function () {
                return filters;
            },
            clearFilters: function () {
                for (var key in filters) {
                    filters[key] = [];
                }
                prototype.isJcr = 0;
            },
            
            getIndexByCode: function (code) {
                for(var journal in $rootScope.resultSet) {
                    var journ = $rootScope.resultSet[journal].journal;
                    if(code === journ.code) {
                        journal = parseInt(journal);
                        return journal;
                    }
                }
            },

            setQuartileSelected: function (value) {
                prototype.quartileSelected = value;
            },

            getQuartileSelected: function () {
                return prototype.quartileSelected;
            },
            
            setIndexSelected: function (value) {
                prototype.indexSelected = value;
            },

            getIndexSelected: function () {
                return prototype.indexSelected;
            },
            
            //PARAMS: from int, to int, title array, succ function, err function
            search: function (params) {
            	
            	prototype.loading = true;
            	
                if (filters.category.length === 1 && filters.quartile.length === 1) {
                    orderBy = 'IMPACT_FACTOR';
                } else {
                    if (prototype.isJcr > 0) {
                        //prototype.isJcr = false;
                        orderBy = 'IMPACT_FACTOR';
                    } else {
                        orderBy = 'TITLE';
                    }
                }

                var from = params.from,
                    to = params.to,
                    title = params.title,
                    succ = params.succ,
                    err = params.err;
                
                if(prototype.quartileSelected !== '') {
                    to = 1000;
                } else {
                    to = params.to;
                }
                
                if ((title.length === 1 && !angular.equals(title, prototype.previousTitle)) && !(title.length === 1 && title[0] === '') && filters.category.length === 0) {
                    if (prototype.previousTitle.length !== 2 && prototype.previousTitle[prototype.previousTitle.length - 1] !== '') {
                        prototype.clearFilters();
                    }
                } else if (filters.category.length > 1) {
                    var cat = filters.category.pop();
                    prototype.clearFilters();
                    filters.category.push(cat);
                }

                var getParams = {};
                getParams.from = from;
                getParams.to = to;
                if (title.length > 0 && title[0] !== '') {
                    getParams.title = title.join(' ');
                }
                for (var key in filters) {
                    if (filters[key].length > 0) {
                        getParams[key] = filters[key].join(',');
                    }
                }
                if (orderBy !== '') {
                    getParams.sort = orderBy;
                }

                prototype.previousTitle = title;

                //                Pagination.resetPage();
                return res.get(getParams, function(data) {
                	prototype.loading = false;
                	if(succ){
                		succ(data);
                	}
                }, function(data) {
                	prototype.loading = false;
                	if(err){
                		err(data);
                	}
                });
            },
            /** This method is used to set what the service should expect the next search so that I can be able to preset some filters */
            setExpectedSearchToken: function (token) {
                prototype.previousTitle = token;
            },
            getExpectedSearchToken: function () {
                return prototype.previousTitle;
            },
            getFiltersNamesExcept: function (exclude) {
                var arr = [];
                for (var i in filters) {
                    if (!exclude || exclude.indexOf(i) === -1) {
                        arr.push(i);
                    }
                }
                return arr;
            },
            getSortingMethod: function () {
                return orderBy;
            },
            
            hasDetailsCache: function (code) {
            	return detailsCache.length > 0 && prototype.getDetailsCache(code) !== undefined;
            },
            getDetailsCache: function (code) {
            	return Utils.find(detailsCache, function(value){
            		return value.details && value.details.code === code;
            	});
            },
            addDetailToCache: function (journal) {
            	detailsCache[(cacheIndex++) % maxCacheSize] = journal;
            },
            
            addCompareJournal: function (title, code) {
                prototype.compareJournals.push({'title': title, 'code': code});
            },
            
            getCompareJournal: function (code) {       
                return Utils.find(prototype.compareJournals, function(element) {
                    return element.code === code;
                });
            },
            
            removeCompareJournal: function (codeToRemove) {
                var journalToRemove = Utils.find(prototype.compareJournals, function(element) {
                    return element.code === codeToRemove;
                });
                prototype.compareJournals.splice(prototype.compareJournals.indexOf(journalToRemove), 1);
            },
            
            getJournalDetails: function(journal, code, callback) {
                var counter = 0;
                var tot = 2;
            	prototype.api.get({
                    id: code
                }, function (dataset) {
                    journal.details = {
                        issn: dataset.issn,
                        eissn: dataset.eissn,
                        opac: dataset.opac,
                        code: dataset.code
                    };
                    if (dataset.typologies) {
                        journal.typology = dataset.typologies[0];
                    }
                    if (dataset.title) {
                        journal.title = dataset.title;
                    }
                    checkCallback(++counter, tot, callback);
                }, function () {
                });
                journal.scopusDetails = null;
                journal.jcrDetails = null;
                journal.woSDetails = null;
                journal.anvurDetails = null;
                prototype.api.getDatabases({
                    id: code
                }, function (dbs) {
                    var tot = dbs.length + 1 - (Utils.find(dbs, function(element) {
                        return element.code === 4;
                    }) ? 1 : 0);
                    checkCallback(counter, tot, callback);
                    dbs.forEach(function (db) {
                        switch (db.code) {
                        case 1: //scopus
                        	prototype.api.getScopusDetails({
                                id: code
                            }, function (data) {
                                if (data.scopusData) {
                                    journal.scopusDetails = data;
                                }
                                checkCallback(++counter, tot, callback);
                            });
                            break;
                        case 2: //wos
                        	prototype.api.getWosDetails({
                                id: code
                            }, function (data) {
                                if (data.woSData) {
                                    var presence = data.woSData.wosEdition.split(',');
                                    journal.wosPresence = presence;
                                    journal.woSDetails = data;
                                }
                                checkCallback(++counter, tot, callback);
                            });
                            break;
                        case 3: //jcr
                        	prototype.api.getJcrDetails({
                                id: code
                            }, function (data) {
                                if (data.jcrData) {
                                    journal.jcrDetails = data;
                                }
                                checkCallback(++counter, tot, callback);
                            });
                            break;

                        case 5: //anvur
                        	prototype.api.getAnvurDetails({
                                id: code
                            }, function (data) {
                                journal.anvurDetails = data;
                                checkCallback(++counter, tot, callback);
                            });
                            break;
                        }
                    });
                });
            }
        };

        return prototype;
    }   ]);
'use strict';

/**
 * @ngdoc overview
 * @name instrumentsgenealogyApp
 * @description
 * # instrumentsgenealogyApp
 *
 * Main module of the application.
 */
angular
  .module('instrumentsgenealogyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

(function () {
    'use strict';

    angular
      .module('admin')
      .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
          .state('home', {
              url: '/wbc-admin',
              templateUrl: 'app/main/main.html',
              controller: 'MainController',
              controllerAs: 'main'
          })
            .state('home.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/components/dashboard/wbc.dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            })
            .state('home.room', {
                url: '/rooms',
                templateUrl: 'app/components/rooms/wbc.rooms.html',
                controller: 'RoomController',
                controllerAs: 'vm'
            })
            .state('home.products', {
                url: '/products',
                templateUrl: 'app/components/products/wbc.products.html',
                controller: 'ProductsController',
                controllerAs: 'vm'
            })
            .state('home.agents', {
                url: '/agents',
                templateUrl: 'app/components/agents/wbc.agents.html',
                controller: 'AgentController',
                controllerAs: 'vm'
            })
          .state('login', {
              url: '/',
              templateUrl: 'app/components/login/wbc.admin.login.html',
              controller: 'LoginController',
              controllerAs: 'vm'
          });

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true).hashPrefix('!');
    }
})();

angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/kakoru');

  $stateProvider
    .state('kakoru', {
      url: '/kakoru',
      component: 'kakoru'
    });
}

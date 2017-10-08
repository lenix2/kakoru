angular
  .module('app')
  .component('headerComponent', {
    templateUrl: 'app/components/header/Header.html',
    controller: Header
  });

function Header($rootScope, $log, $state) {
  var vm = this;
  vm.loggedInUser = $rootScope.loggedInUser;
  vm.currentNavItem = $state.current.name;

  vm.getState = function () {
    vm.currentNavItem = $state.current.name;
    return vm.currentNavItem;
  };

  vm.goTo = function (dir) {
    $state.go(dir);
  };
}


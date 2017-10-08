angular
  .module('app')
  .component('kakoru', {
    templateUrl: 'app/containers/kakoru/Kakoru.html',
    controller: Login
  });

function Login($scope, $log, $http, $rootScope, $state, $mdDialog, $document) {
  var vm = this;

  vm.gameX = 3;
  vm.gameY = 3;

  vm.game = {rows: []};

  vm.generateGame = function () {
      for (var i = 0; i < vm.gameY; i++) {
        var tmp = {cells: []};

        for (var j = 0; j < vm.gameX; j++) {
          tmp.cells.push({
                tr: -1,
                bl: -1,
                value: 0
          });
        }

        vm.game.rows.push(tmp);
      }
  };

  vm.generateGame();

  vm.game = {
      "rows": [
          {
              "cells": [
                  {
                      "tr": -1,
                      "bl": -1
                  },{
                      "tr": 0,
                      "bl": 12
                  },{
                      "tr": 0,
                      "bl": 10
                  }
              ]
          },{
              "cells": [
                  {
                      "tr": 17,
                      "bl": 0
                  },{
                      "value": 0
                  },{
                      "value": 0
                  }
              ]
          },{
              "cells": [
                  {
                      "tr": 5,
                      "bl": 0
                  },{
                      "value": 0
                  },{
                      "value": 0
                  }
              ]
          }
      ]
  };

  vm.changeGameCell = function(cell, ev) {
      if (cell.tr < 0 || cell.bl < 0) {
        cell.tr = 5;
        cell.bl = 5;
      } else if (cell.tr > 0 || cell.bl > 0) {
        cell.tr = null;
        cell.bl = null;
      } else if ((cell.tr === 0 || !cell.tr) && (cell.bl === 0 || !cell.bl)) {
        cell.tr = -1;
        cell.bl = -1;
      }
  };

  vm.addRight = function () {
    for (var i = 0; i < vm.game.rows.length && vm.game.rows[vm.game.rows.length-1].cells.length < 30; i++) {
      vm.game.rows[i].cells.push({
          "tr": -1,
          "bl": -1
      });
    }
  };

  vm.removeRight = function () {
      for (var i = 0; i < vm.game.rows.length && vm.game.rows[vm.game.rows.length-1].cells.length > 2; i++) {
          vm.game.rows[i].cells.splice(-1,1);
      }
  };

  vm.addBottom = function () {
      var tmp = [];

      for (var i = 0; i < vm.game.rows[0].cells.length; i++) {
          tmp.push({
              "tr": -1,
              "bl": -1
          });
      }

      if (vm.game.rows.length < 30) {
        vm.game.rows.push({cells: tmp});
      }

  };

    vm.removeBottom = function () {
        if (vm.game.rows.length > 2) {
          vm.game.rows.splice(-1, 1);
        }
    };

  vm.request = function () {
    $http({
      url: "api/",
      method: "POST",
      data: angular.toJson({}),
      headers: {'Content-Type': 'application/json'}
    })
      .success(function (response) {

      })
      .error(function (response) {

      });
  };
}

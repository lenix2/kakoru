angular
  .module('app')
  .component('background', {
    templateUrl: 'app/components/background/Background.html',
    controller: Background
  });

function Background($document, $window, $scope) {
  /*
  $scope.animationRunning = false;

  var canvas = $document[0].getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var w = canvas.width = $window.innerWidth;
  var h = canvas.height = $window.innerHeight;

  var hue = 111;
  var stars = [];
  var count = 0;
  var maxStars = 1000;
  var twinkleTrue = false;

  // Cache gradient
  var canvas2 = $document[0].createElement('canvas');
  var ctx2 = canvas2.getContext('2d');
  canvas2.width = 100;
  canvas2.height = 100;
  var half = canvas2.width / 2;
  var gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
  gradient2.addColorStop(0.025, '#fff');
  gradient2.addColorStop(0.1, 'hsl(' + hue + ', 41%, 33%)');
  gradient2.addColorStop(0.25, 'hsl(' + hue + ', 44%, 6%)');
  gradient2.addColorStop(1, 'transparent');

  ctx2.fillStyle = gradient2;
  ctx2.beginPath();
  ctx2.arc(half, half, half, 0, Math.PI * 2);
  ctx2.fill();

  // End cache

  function random(min, max) {
    if (arguments.length < 2) {
      max = min;
      min = 0;
    }

    if (min > max) {
      var hold = max;
      max = min;
      min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var Star = function () {
    this.orbitRadius = random(w / 2 - 50);
    this.radius = random(100, this.orbitRadius) / 10;
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 150000;
    this.alpha = random(2, 10) / 10;

    count++;
  };

  Star.prototype.draw = function () {
    var x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX;
    var y = Math.cos(this.timePassed) * this.orbitRadius / 2 + this.orbitY;
    var twinkle = random(10);

    if (twinkleTrue) {
      if (twinkle === 1 && this.alpha > 0.5) {
        this.alpha -= 0.025;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.025;
      }
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed += this.speed;
  };

  for (var i = 0; i < maxStars; i++) {
    stars[i] = new Star();
  }

  var firstRender = true;
  function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'hsla(' + hue + ', 100%, 1%, 1)';
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';
    for (var i = 1, l = stars.length; i < l; i++) {
      stars[i].draw();
    }
    if ($scope.animationRunning && !$scope.showEasteregg) {
      $window.requestAnimationFrame(animation);
    } else if (firstRender) {
      firstRender = false;
      $window.requestAnimationFrame(animation);
    }
  }
  animation();

  $scope.toggleAnimation = function () {
    if ($scope.animationRunning) {
      animation();
    }
  };

  $scope.showEasteregg = false;
  $scope.clickHold = function () {
    $scope.showEasteregg = !$scope.showEasteregg;
  };
  */
}

angular
    .module('app').directive('onClickAndHold', function ($parse, $timeout) {
  return {
    link: function (scope, element, attrs) {
      var clickAndHoldFn = $parse(attrs.onClickAndHold);
      var doNotTriggerClick;
      var timeoutHandler;
      element.on('mousedown', function () {
        $timeout.cancel(timeoutHandler);
        timeoutHandler = $timeout(function () {
          clickAndHoldFn(scope, {$event: event})
        }, 5000)
      });
      element.on('mouseup', function (event) {
        $timeout.cancel(timeoutHandler);
      });

      if (attrs.onClick) {
        var clickFn = $parse(attrs.onClick);
        element.on('click', function (event) {
          if (doNotTriggerClick) {
            doNotTriggerClick = false;
            return;
          }
          clickFn(scope, {$event: event});
          scope.$apply();
        });
      }
    }
  }
})
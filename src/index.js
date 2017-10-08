angular
    .module('app', [
        'ui.router',
        'ngMaterial',
        'ui.bootstrap', 'ui-notification', 'ui.utils', 'ui.tree',
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ngMessages'
    ])
    .config(function ($httpProvider, $mdDateLocaleProvider, $mdIconProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    })
    .run(function ($rootScope, $document, $http, $log, $state, $interval, $mdToast, $mdDialog) {
        $log.info("run");

        $rootScope.mainURL = "http://127.0.0.1:8080/";

        var onRequestErrorListener = $rootScope.$on('request-error', function (event, error) {
            $log.error(error);
            var text = "Fehler beim Aufruf von: " + error.config.url;

            if (error.status > -1) {
                text = error.statusText + "!";
            }

            var toast = $mdToast.simple()
                .textContent(text)
                .action('X')
                .highlightAction(true)
                .highlightClass('md-accent')
                .position("top right")
                .hideDelay(5000);

            $mdToast.show(toast);
        });

        $rootScope.isState = function (state) {
            if ($state.$current.name.contains(state)) {
                return true;
            }
        };
    });

angular.module('app').factory('AuthInterceptor', function ($rootScope, $q, $log) {
    return {
        response: function (response) {
            if (response.headers('authorization')) {
                var authheader = response.headers('authorization');
                if (authheader.indexOf("Bearer") > -1) {
                    $rootScope.$broadcast({
                        200: 'auth-successful'
                    }[response.status], authheader);
                }
            }
            return response;
        },
        responseError: function (rejection) {
            $rootScope.$broadcast({
                403: 'auth-not-authenticated',
                '-1': 'auth-not-authenticated'
            }[rejection.status], rejection);

            $rootScope.$broadcast('request-error', rejection);

            return $q.reject(rejection);
        },
        request: function (config) {
            if (config.url.substring(0, 3) === "api") {
                config.url = $rootScope.mainURL + config.url;
            }
            return config || $q.when(config);
        }
    };
});


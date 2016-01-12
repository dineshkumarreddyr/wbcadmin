(function () {
    "use strict";

    angular
    .module('admin')
    .factory('$appFactory', appFactory);

    function appFactory($http, $q, $appConfig) {

        function authenticate(data) {
            var deferred = $q.defer();
            $http.post($appConfig.apiUrl + 'auth', data).success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function addRooms(data) {
            var deferred = $q.defer();

            $http.post($appConfig.apiUrl + 'room', data).success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function getRooms() {
            var deferred = $q.defer();

            $http.get($appConfig.apiUrl + 'room').success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function addProducts(data) {
            var deferred = $q.defer();

            $http.post($appConfig.apiUrl + 'products', data).success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function getProducts() {
            var deferred = $q.defer();

            $http.get($appConfig.apiUrl + 'products').success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        };

        function deleteProduct(id) {
            var deferred = $q.defer();

            $http.delete($appConfig.apiUrl + 'products/' + id).success(function (response) {
                deferred.resolve(response);
            })
            .error(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }

        return {
            Authenticate: authenticate,
            AddRooms: addRooms,
            GetRooms: getRooms,
            AddProducts: addProducts,
            GetProducts: getProducts,
            Deleteproduct: deleteProduct
        }
    }
})();
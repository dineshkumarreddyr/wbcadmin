(function () {
    "use strict";

    angular
    .module('admin')
    .controller('ProductsController', productsController);

    function productsController($log, $timeout, $appFactory) {
        var vm = this;

        vm.productgridOptions = {
            columnDefs: [
                { field: 'name', displayName: 'Name' },
                { field: 'category', displayName: 'Category' },
                { field: 'description', displayName: 'Description' },
                { field: 'price', displayName: 'Price' },
                { name: 'Action', displayName: 'Action', cellTemplate: '<a href="javascript:void(0)" data-ng-click="grid.appScope.vm.delete(row.entity)" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></a>' }
            ]
        };

        function init() {
            this.getProductList = function () {
                $appFactory.GetProducts().then(function (response) {
                    if (response && response.status && response.status.indexOf('success') > -1) {
                        vm.productsList = response.records;

                        vm.productgridOptions.data = vm.productsList;
                    }
                }, function (response) {
                    $log.error('API Failed' + response);
                });
            }
        }
        (new init()).getProductList();

        vm.add = function (invalid) {
            if (invalid) {
                alert('Mandatory !!');
                return;
            }

            var data = {
                name: vm.productname,
                category: vm.category,
                description: vm.description,
                price: vm.price
            }

            if (data) {
                $appFactory.AddProducts(data).then(function (response) {
                    if (response && response.status && response.status.indexOf('success') > -1) {
                        alert('Data inserted successfully !!');
                        (new init()).getProductList();
                        clearFields();
                    }
                }, function (response) {
                    $log.error('API Failed' + response);
                });
            }
        };

        function clearFields() {
            vm.productname = vm.category = vm.description = vm.price = null;
        };

        vm.delete = function (variable) {
            if (variable) {
                $appFactory.Deleteproduct(variable._id).then(function (response) {
                    if (response && response.status && response.status.indexOf('success') > -1) {
                        alert('Deleted Successfully !!');
                        (new init()).getProductList();
                    }
                }, function (response) {
                    $log.error('API Failed' + response);
                });
            }
        }
    }
})();
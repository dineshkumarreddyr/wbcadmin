(function () {
    "use strict";

    angular
    .module('admin')
    .controller('RoomController', roomController);

    function roomController($log, $timeout, $appFactory, $cookies) {
        var vm = this;

        vm.roomgridOptions = {
            columnDefs: [
                { field: 'name', displayName: 'Room Name' },
                { field: 'about', displayName: 'Description' },
                { field: 'capacity', displayName: 'Capacity' }
            ]
        };

        function init() {
            vm.roomList = [];
            this.getRoomDetails = function () {
                $appFactory.GetRooms().then(function (response) {
                    if (response && response.status && response.status.indexOf('success') > -1) {
                        vm.roomList = response.records;

                        vm.roomgridOptions.data = vm.roomList;
                    }
                }, function (response) {
                    $log.error('API Failed' + response);
                });
            }
        };

        (new init).getRoomDetails();

        vm.addRooms = function (invalid) {

            var pricearray = [];
            if (invalid) {
                alert('All Fields are mandatory!!');
                return;
            }

            pricearray.push({ type: 'Peak', time: '10 AM - 6 PM', price: [{ hours: '2', value: vm.pricepeakhours }, { hours: '8', value: vm.pricepeakhoursfull }] },
                { type: 'Non Peak', time: '8-10 AM and 6-10 PM', price: [{ hours: '2', value: vm.pricenonpeakhours }, { hours: '4', value: vm.pricenonpeakhoursfull }] })

            var data = {
                name: vm.roomname,
                about: vm.about,
                capacity: vm.capacity,
                createduser: $cookies.get('name'),
                price: pricearray
            }

            $appFactory.AddRooms(data).then(function (response) {
                if (response && response.status && response.status.indexOf('success') > -1) {
                    alert('Data inserted successfully !!');
                    (new init()).getRoomDetails();
                    clearFields();
                }
            }, function (response) {
                $log.error('API Failed' + response);
            });
        };

        function clearFields() {
            vm.roomname = vm.about = vm.capacity = vm.pricenonpeakhours = vm.pricenonpeakhoursfull = vm.pricepeakhours = vm.pricepeakhoursfull = null;
        }
    }
})();
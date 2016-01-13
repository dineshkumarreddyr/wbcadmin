(function () {
    "use strict";

    angular
    .module('admin')
    .controller('AgentController', agentController);

    function agentController($log, $timeout, $appFactory, $cookies) {
        var vm = this;

        vm.agentgridOptions = {
            columnDefs: [
                { field: 'name', displayName: 'Agent Name' },
                { field: 'email', displayName: 'Email Address' },
                { field: 'mobile', displayName: 'Mobile Number' }
            ]
        }

        function init() {
            this.getAgentList = function () {
                $appFactory.GetAgents().then(function (response) {
                    if (response && response.status && response.status.indexOf('success') > -1) {
                        vm.agentsList = response.records;

                        vm.agentgridOptions.data = vm.agentsList;
                    }
                }, function (response) {
                    $log.error('API Failed' + response);
                });
            }
        }
        (new init()).getAgentList();

        vm.addAgents = function (invalid) {
            if (invalid) {
                alert('Mandatory !!');
                return;
            }

            var data = {
                name: vm.name,
                email: vm.email,
                password: vm.password,
                mobile: vm.mobile,
                createduser: $cookies.get('name')
            }

            if (data) {
                $appFactory.AddAgents(data).then(function (response) {
                    if (response && response.status && response.status.indexOf('success') > -1) {
                        alert('Data inserted successfully !!');
                        (new init()).getAgentList();
                        clearFields();
                    }
                }, function (response) {
                    $log.error('API Failed' + response);
                });
            }
        }

        function clearFields() {
            vm.name = vm.email = vm.mobile = vm.password = null;
        }
    }
})();

app.controller('districtCont', ['$scope', '$http', 'CRUDServices', '$routeParams', 'growl', function ($scope, $http, CRUDServices, $routeParams, growl) {
    ctrlTags($scope, $http);
    $scope.bean = {"id": null, "name": ""};
    CRUDServices.methodLink = 'district';
    $scope.getBeans = function () {
        CRUDServices.getAll().success(function (data) {
            $scope.beans = data.result;

        });
    }
    $scope.getBeans();

    $scope.resetFields = function () {
        $scope.bean = {"id": null, "name": ""};
    }

    $scope.saveBean = function () {
        if ($scope.bean.id === null) {
            CRUDServices.add($scope.bean).success(function (data) {
                growl.success('تمت الإضافة بنجاح ', {title: 'عملية ناجحة!'});

                $scope.getBeans();
            });
        } else {
            CRUDServices.update($scope.bean).success(function (data) {
                growl.success('تمت تحديثة بنجاح ', {title: 'عملية ناجحة!'});

                $scope.getBeans();

            });

        }
        $scope.resetFields();
    }

    $scope.selectBean = function (xBean) {
        $scope.bean = xBean;
    }
}]);

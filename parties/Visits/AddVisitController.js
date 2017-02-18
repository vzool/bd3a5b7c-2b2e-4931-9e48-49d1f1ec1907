
app.controller('addVisitCtrl',['$scope', '$http', 'CRUDServices', 'setting',  'growl', function ($scope, $http, CRUDServices,  setting, growl) {
    ctrlTags($scope, $http);
        $scope.bean = {"id": null, "date": {}, "orgnizationBean":null, "note": null, "userBean": {}};
    CRUDServices.methodLink = 'visit';
    $scope.getBeans = function () {
        CRUDServices.getAll().success(function (data) {
            $scope.beans = data.result;

        });
    }
    $scope.getBeans();

    $scope.resetFields = function () {
        $scope.bean = {"id": null, "date": {}, "orgnizationBean": null, "note": null, "userBean": {}};
    }

    $scope.saveBean = function () {
        $scope.bean.date=new Date().getTime();
        if ($scope.bean.id === null) {
            CRUDServices.add($scope.bean).success(function (data) {
                    growl.success('تمت الإضافة بنجاح', {title: 'عملية ناجحة!'});

            });
        } else {
            CRUDServices.update($scope.bean).success(function (data) {
            });

        }
        $scope.resetFields();
    }

    $scope.selectBean = function (xBean) {
        $scope.bean = xBean;
    }
    $scope.getUserBeans = function () {
            CRUDServices.getAllCustom('user').success(function (data) {
                $scope.users = data.result;
                console.log($scope.users);
            });
        }
        $scope.getUserBeans();
        $scope.getOrgs = function (val) {
            return $http.get(setting.connection.url + 'orgnization/search-by-name?name=' + val, {headers: {'X-Auth-Token': setting.connection.sessionId}}).then(function (response) {
                console.log(response.data.result);
                return response.data.result;
            });
        };
        $scope.onSelect = function ($item, $model, $label) {
//            $location.url('/orgs/' + $item.id);
        };

}]);

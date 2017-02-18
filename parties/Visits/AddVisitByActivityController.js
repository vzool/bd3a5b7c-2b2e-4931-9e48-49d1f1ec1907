
app.controller('addVisitsCtrl', ['$scope', '$http', 'CRUDServices', 'setting', 'growl', function ($scope, $http, CRUDServices, setting, growl) {
        saveBean = {
            "activityId": 0,
            "districtId": 0,
            "userId": 0
        }

        $scope.saveBean = function () {
            saveBean.activityId = $scope.bean.activity.id;
            saveBean.districtId = $scope.bean.district.id;
            saveBean.userId = $scope.bean.userBean.id;

            CRUDServices.postCustom("visit/addDistrictActivityVisitsForUsers",saveBean).success(function (data) {
                growl.success('تمت الإضافة بنجاح', {title: 'عملية ناجحة!'});

            });

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

        $scope.getUserBeans = function () {
            CRUDServices.getAllCustom('activity').success(function (data) {
                $scope.activities = data.result;
                console.log($scope.activities);
            });
        }
        $scope.getUserBeans();

        $scope.getUserBeans = function () {
            CRUDServices.getAllCustom('district').success(function (data) {
                $scope.districts = data.result;
                console.log($scope.districts);
            });
        }
        $scope.getUserBeans();
        $scope.onSelect = function ($item, $model, $label) {
//            $location.url('/orgs/' + $item.id);
        };

    }]);

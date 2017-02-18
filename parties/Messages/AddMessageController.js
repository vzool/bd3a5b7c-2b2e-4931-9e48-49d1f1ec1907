
app.controller('addMessageCtrl', ['$scope', '$http', 'CRUDServices', 'setting', '$base64', 'growl', function ($scope, $http, CRUDServices, setting, $base64, growl) {
        $scope.selectedUser = {};
        $scope.uploadFile;
        $scope.bean = {base64Image: "", name: "", type: false, users: [], extension: ""};
        CRUDServices.methodLink = 'message';
        $scope.getBeans = function () {
            CRUDServices.getAll().success(function (data) {
                $scope.beans = data.result;

            });
        }
        $scope.getBeans();

        $scope.resetFields = function () {
            $scope.bean = {base64Image: null, name: null, type: false, users: []};
        }

        $scope.saveBean = function () {
//        if ($scope.bean.id === null) {
            if ($scope.base64Image != null) {
                var base64Muni = $scope.base64Image.split(',')[1];
                $scope.bean.base64Image = base64Muni;
                if ($scope.uploadFile.type == 'application/pdf') {
                    $scope.bean.extension = ".pdf";

                } else {

                    $scope.bean.extension = ".png";
                }
//            }
                console.log($scope.selectedUser);
                if ($scope.selectedUser != null) {
                    $scope.bean.users.push($scope.selectedUser);
                }
                if ($scope.bean.type) {
                    $scope.bean.users = null;
                }
                CRUDServices.customMethod('sendMessages', $scope.bean).success(function (data) {
                    growl.success('تمت الإضافة بنجاح', {title: 'عملية ناجحة!'});

                });
            } else {
                //CRUDServices.update($scope.bean).success(function (data) {
                // });
                growl.error('لا يوجد محتوى', {title: 'عملية غير ناجحة!'});
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

        $scope.onSelect = function ($item, $model, $label) {
//            $location.url('/orgs/' + $item.id);
        };

    }]);

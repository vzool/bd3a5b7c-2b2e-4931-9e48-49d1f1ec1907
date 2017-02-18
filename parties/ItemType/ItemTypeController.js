
function ctrlTags($scope, $http) {
    $http.get('js/countries.json').success(function (data) {
        $scope.items = data;
    }).error(function (data, status, error, config) {
        $scope.items = [{heading: "Error", description: "Could not load json   data"}];
    });
};

app.controller('itemTypeCont', ['$scope', '$http', 'CRUDServices', '$routeParams', 'growl', function ($scope, $http, CRUDServices, $routeParams, growl) {
        
    ctrlTags($scope, $http);
    
    $scope.bean = {
        "id": null,
        "identity": "",
        "name": "",
        "nationality": "",
        "phone": ""
    };

    CRUDServices.methodLink = 'owner';
    $scope.getBeans = function (page) {
        CRUDServices.getAll(page).success(function (data) {
            $scope.totalPages = data.result.totalPages;
            $scope.numberOfElements = data.result.numberOfElements;
            $scope.totalElements = data.result.totalElements;
            $scope.currentPageNumber = data.result.number;
            $scope.beans = data.result.content;
        });
    }

    $scope.getBeans();

    $scope.nextPage = function(){
        console.log('NEXT', $scope.currentPageNumber, $scope.totalPages);
        if($scope.currentPageNumber <= $scope.totalPages){
            $scope.getBeans(++$scope.currentPageNumber);
        }
    };

    $scope.previousPage = function(){
        console.log('PREVIOUS', $scope.currentPageNumber, $scope.totalPages);
        if($scope.currentPageNumber > 1){
            $scope.getBeans(--$scope.currentPageNumber);
        }
    };

    $scope.resetFields = function () {
        $scope.bean = {
            "id": null,
            "identity": "",
            "name": "",
            "nationality": "",
            "phone": ""
        };
    }

    $scope.saveBean = function () {

        if(!$scope.bean.name){
            growl.error('لا يمكن حفظ السجل: اسم المالك مطلوب', {title: 'فشلت العملية'});
            return;
        }else if(!$scope.bean.identity){
            growl.error('لا يمكن حفظ السجل: رقم الهوية مطلوبة', {title: 'فشلت العملية'});
            return;
        }else if(!$scope.bean.nationality){
            growl.error('لا يمكن حفظ السجل: تحديد جنسية المالك مطلوب', {title: 'فشلت العملية'});
            return;
        }else if(!$scope.bean.phone){
            growl.error('لا يمكن حفظ السجل: رقم الهاتف أو الجوال مطلوبة', {title: 'فشلت العملية'});
            return;
        }
        
        if ($scope.bean.id === null) {
    
            CRUDServices.add($scope.bean).success(function (data) {
                growl.success($scope.bean.name + 'تمت إضافتة المالك بنجاح ', {title: 'عملية ناجحة!'});
                location.href = "#/showowner";
            }).error(function(data){
                growl.error('الخادم رفض الطلب: البيانات ناقصة أو غير صحيحة', {title: 'فشلت العملية'});
            });

        } else {

            CRUDServices.update($scope.bean).success(function (data) {
                growl.success($scope.bean.name + 'تمت تحديثة بنجاح ', {title: 'عملية ناجحة!'});
                location.href = "#/showowner";
            }).error(function(data){
                growl.error('الخادم رفض الطلب: البيانات ناقصة أو غير صحيحة', {title: 'فشلت العملية'});
            });;
        }
        $scope.resetFields();
    }

    $scope.selectBean = function (xBean) {
        $scope.bean = xBean;
    }

    $scope.getBean = function (id) {

        CRUDServices.get("owner", id).success(function (data) {
            $scope.bean = data.result;
        });
    }

    if ($routeParams.ID) {
        $scope.getBean($routeParams.ID);
    }

}]);

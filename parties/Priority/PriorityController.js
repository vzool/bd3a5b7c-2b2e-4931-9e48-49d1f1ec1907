
app.controller('priorityCont', ['$scope', '$http', 'CRUDServices', '$routeParams', 'growl', function($scope, $http, CRUDServices, $routeParams, growl){
    $scope.bean = {
        "id" : null,
        "name": "",
        "days": ""
    };
    CRUDServices.methodLink = 'priority';
    $scope.getBeans = function (){
    	CRUDServices.getAll().success(function(data){
            $scope.beans = data.result ;

        });
    }
    $scope.getBeans();

    $scope.resetFields = function (){
        $scope.bean = {
            "id" : null ,
            "name": "",
            "days": ""
        };
    }

    $scope.saveBean = function () {

        if(!$scope.bean.name){
            growl.error('لا يمكن حفظ السجل: اسم نوع الأهمية مطلوب', {title: 'فشلت العملية'});
            $("#priority_name").focus();
            return;
        }else if(!$scope.bean.days){
            $("#priority_days").focus();
            growl.error('لا يمكن حفظ السجل: عدد دورة الأيام مطلوب', {title: 'فشلت العملية'});
            return;
        }

        if ($scope.bean.id === null) {

        	CRUDServices.add($scope.bean).success(function (data) {
                
                growl.success($scope.bean.name + 'تمت إضافتة المالك بنجاح ', {title: 'عملية ناجحة!'});
                $scope.resetFields();
            	$scope.getBeans();

            }).error(function(data){
                growl.error('الخادم رفض الطلب: البيانات ناقصة أو غير صحيحة', {title: 'فشلت العملية'});
            });

        } else {

        	CRUDServices.update($scope.bean).success(function (data) {
                
                growl.success($scope.bean.name + 'تمت إضافتة المالك بنجاح ', {title: 'عملية ناجحة!'});
                $scope.resetFields();
                $scope.getBeans();

            }).error(function(data){
                growl.error('الخادم رفض الطلب: البيانات ناقصة أو غير صحيحة', {title: 'فشلت العملية'});
            });
        }
    }

    $scope.selectBean = function(xBean){
    	$scope.bean = xBean ;
    }
    
    $scope.getBean = function (id) {

        CRUDServices.get("priority", id).success(function (data) {
            $scope.bean = data.result;
        });
    }
       
}]);


app.controller('activityCont', ['$scope', '$http', 'CRUDServices', '$routeParams', 'growl', function($scope, $http, CRUDServices, $routeParams, growl){

    $scope.bean = {
        "id" : null,
        "name": "",
        "pirority": ""
    };

    CRUDServices.methodLink = 'activity';

    $scope.getBeans = function (){
    	CRUDServices.getAll().success(function(data){
            $scope.beans = data.result ;

        });
    }
    $scope.getBeans();

    $scope.resetFields = function (){
        $scope.bean = {
            "id" : null,
            "name": "",
            "pirority": ""
        };
    }

    $scope.saveBean = function () {
        if ($scope.bean.id === null) {
        	CRUDServices.add($scope.bean).success(function (data) {

            	$scope.getBeans();
            });
        } else {
        	CRUDServices.update($scope.bean).success(function (data) {
                $scope.getBeans();
            });

        }
        $scope.resetFields();
    }

    $scope.selectBean = function(xBean){
    	$scope.bean = xBean;
    }

    $scope.getBean = function (id) {

        CRUDServices.get("activity", id).success(function (data) {
            $scope.bean = data.result;
        });
    }

    CRUDServices.getAllCustom('priority').success(function (data) {
        $scope.priorities = data.result;
        console.log($scope.priorities);
    });

}]);

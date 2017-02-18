
app.controller('indexCtrl', function($scope,$http,CRUDServices){
    $scope.bean = {"id" : null , "identity" : "",  "name": "",
  "nationality": "",
  "phone": ""};
    CRUDServices.methodLink = 'owner';
    $scope.getBeans = function (){
    	CRUDServices.getAll().success(function(data){
            $scope.beans = data.result ;

        });
    }
    $scope.getBeans();

    $scope.resetFields = function (){
        $scope.bean = {"id" : null , "identity" : "",  "name": "",
  "nationality": "",
  "phone": ""};
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
    	$scope.bean = xBean ;
    }
});


app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items,data) {

    $scope.items = items;
        if($scope.items!=null){
               $scope.selected = {
    
        item: $scope.items[0]
    };
    }
   
    $scope.data=data;
    $scope.ok = function () {
        if($scope.selected!==undefined){
        $uibModalInstance.close($scope.selected.item);
        }else{
                    $uibModalInstance.close($scope.data);

        }
        };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

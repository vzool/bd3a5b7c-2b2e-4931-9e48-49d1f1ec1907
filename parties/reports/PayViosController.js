
app.controller('payViosCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', '$base64', '$routeParams', 'setting', '$location', 'growl', '$uibModal', '$sce', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, $base64, $routeParams, setting, $location, growl, $uibModal, $sce) {
$scope.bean={};
$scope.content=null;
$scope.payBean={
  "exemptedViolationIds": [],
  "owner": {
    "id": 0,
    "identity": "",
    "name": "",
    "nationality": "",
    "orgnizations": [],
    "phone": ""
  },
  "payedViolationIds": []
};
        $scope.beans = {
            "id": 0,
            "date": null,
            "note": null,
            "value": 0,
            "userBean":{},
            "vioType": {},
            "selected": false,
            
        };

        $scope.beans=[];


        $scope.getBeans = function () {
            CRUDServices.getAll().success(function (data) {
                $scope.beans = data.result;

               
            });
        }
        $scope.getOwnerBeans = function () {
            CRUDServices.getAllCustom('owner').success(function (data) {
                $scope.owners = data.result;
            });
        }
        $scope.refreshOwners = function (name) {
            if (name == null)
                return [];
            if (name.length < 2)
                return [];
            return $http.get(
                    setting.connection.url + 'owner/search-by-name?name=' + name, {headers: {'X-Auth-Token': setting.connection.sessionId}}
            ).then(function (response) {
                $scope.owners = response.data.result
            });
        };
     
        $scope.getBean = function (id) {

           
        }
        if ($routeParams.orgID !== null) {
            $scope.getBean($routeParams.orgID);
        }
 

     

        $scope.selectBean = function (xBean) {
            $scope.bean = xBean;
        }
        //Table
     
        $scope.getOwner = function (owner) {
            CRUDServices.get('owner', owner).then(function (data) {
                $scope.owner = data.data.result;
                $scope.bean.ownerBean.id = $scope.owner.id;
                $scope.getUnfinishedVios($scope.owner.id);
            }, function (data) {
            });
        };

        $scope.getLocation = function (val) {
            return $http.get(setting.connection.url + 'orgnization/search-by-name?name=' + val, {headers: {'X-Auth-Token': setting.connection.sessionId}}).then(function (response) {
                console.log(response.data.result);
                return response.data.result;
            });
        };
        $scope.onSelect = function (id) {
            $location.url('/orgs/' + id);
        };
        
        $scope.getUnfinishedVios= function (ownerId) {
            
            CRUDServices.getData("violation/unfinished-violations",{"ownerId":ownerId}).success(function (data) {
                $scope.beans = data.result;
                console.log($scope.beans);
                
            
            });
        }
        $scope.payVios=function(){
           $scope.payBean.owner=$scope.owner;
                            for (i = 0; i < $scope.beans.length; i++) {
                                 $scope.payBean.payedViolationIds.push($scope.beans[i].id);
                                }
           
            CRUDServices.postCustom("violation/pay-violations", $scope.payBean).success(function (data) {
                    growl.success('تم دفع المخالفات بنجاح', {title: 'Success!'});
       $scope.content = $sce.trustAsResourceUrl(data.result);

            });
            
      
        }
        
         $scope.extempVios=function(){
            $scope.payBean.owner=$scope.owner;
                            for (i = 0; i < $scope.beans.length; i++) {
                                 $scope.payBean.exemptedViolationIds.push($scope.beans[i].id);
                                }
           
            CRUDServices.customMethod("violation/pay-violations", $scope.payBean).success(function (data) {
                    growl.success('تم إعفاء المخالفات بنجاح', {title: 'Success!'});

            });
        }
        $scope.open = function (id) {
            search = {
                "fromDate": null,
                "orgnizationId": id,
                "ownerId": null,
                "toDate": null,
                "userId": null
            };
            CRUDServices.getVoisByOrg(search).success(function (data) {
                $scope.violations = data.result;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: 10,
                    resolve: {
                        items: function () {

                            return $scope.violations;

                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
                console.log($scope.violations)

            });
        };

    }]);



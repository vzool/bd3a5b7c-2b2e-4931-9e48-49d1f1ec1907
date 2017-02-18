
app.controller('orgCloseHistoryCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', '$base64', '$routeParams', 'setting', '$location', 'growl', '$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, $base64, $routeParams, setting, $location, growl, $uibModal) {
  $scope.violations =[];
        $scope.bean = {
            "activityBean": {},
            "districtBean": {},
            "employees": null,
            "id": null,
            "lastVisitDate": null,
            "lat": "",
            "lon": "",
            "muniFromDate": null,
            "muniImage": null,
            "muniImageBytes": "",
            "muniNo": "",
            "muniToDate": null,
            "name": "",
            "orgCode": null,
            "orgDocs": null,
            "orgImage": null,
            "orgImageBytes": "",
            "ownerBean": {},
            "remainingVisits": null,
            "street": ""
        };

      
        CRUDServices.methodLink = 'orgnization';

     
       
      
        $scope.refreshOrgs = function (name) {
            if (name == null)
                return [];
            if (name.length < 2)
                return [];
            return $http.get(
                    setting.connection.url + 'orgnization/search-by-name?name=' + name, {headers: {'X-Auth-Token': setting.connection.sessionId}}
            ).then(function (response) {
                $scope.orgs = response.data.result
            });
        };


        $scope.refreshCode = function (orgCode) {
            if (orgCode == null)
                return [];
            if (orgCode.length < 4)
                return [];
            return $http.get(
                    setting.connection.url + 'orgnization/search-by-code?orgCode=' + orgCode, {headers: {'X-Auth-Token': setting.connection.sessionId}}
            ).then(function (response) {
                $scope.orgs = response.data.result
            });
        };
//        $scope.getLocation = function (val) {
//            return $http.get(setting.connection.url + 'orgnization/search-by-name?name=' + val, {headers: {'X-Auth-Token': setting.connection.sessionId}}).then(function (response) {
//                return response.data.result;
//            });
//        };
//        $scope.getOwnerBeans();
        $scope.getActivitiesBeans = function () {
            CRUDServices.getAllCustom('activity').success(function (data) {
                $scope.activities = data.result;
            });
        }
        $scope.getActivitiesBeans();
        $scope.getDistrictsBeans = function () {
            CRUDServices.getAllCustom('district').success(function (data) {
                $scope.districts = data.result;
                console.log($scope.districts);
            });
        }
        $scope.getDistrictsBeans();

        $scope.getBean = function (id) {

            CRUDServices.get("orgnization", id).success(function (data) {
                $scope.bean = data.result;
              
            });
                search = {
                "orgnizationId": id
            };
            CRUDServices.getData("orgClose/get-history-for-org",search).success(function (data) {
                $scope.items = data.result;
              
              
            });
            
        }
        if ($routeParams.orgID !== null) {
            $scope.getBean($routeParams.orgID);
        }
        $scope.resetFields = function () {
            $scope.bean = {
                "activityBean": {},
                "districtBean": {},
                "employees": null,
                "id": null,
                "lastVisitDate": null,
                "lat": "",
                "lon": "",
                "muniFromDate": {},
                "muniImage": null,
                "muniImageBytes": "",
                "muniNo": "",
                "muniToDate": {},
                "name": "",
                "orgCode": null,
                "orgDocs": null,
                "orgImage": {},
                "orgImageBytes": "",
                "ownerBean": {},
                "street": ""
            };
        }

       

        $scope.selectBean = function (xBean) {
            $scope.bean = xBean;
        }
         
      
     

        $scope.getLocation = function (val) {
            return $http.get(setting.connection.url + 'orgnization/search-by-name?name=' + val, {headers: {'X-Auth-Token': setting.connection.sessionId}}).then(function (response) {
                console.log(response.data.result);
                return response.data.result;
            });
        };
        $scope.onSelect = function (id) {
            $location.url('/orgclosehist/' + id);
        };
       $scope.getActionType = function (val) {
           return "test"
       }
    }]);



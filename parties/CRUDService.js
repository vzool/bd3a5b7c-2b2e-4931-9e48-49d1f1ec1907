/**
 */

app.factory('CRUDServices', function ($http, $window, setting) {
    var obj = {};
    obj.methodLink = '';
    var serviceUrl = setting.connection.url;
    var session = setting.connection.sessionId;

    obj.getAll = function (requestedPage, perPageRequest) {
        
        var parameters = "";

        if(requestedPage){
            parameters += "page=" + requestedPage;
        }

        if(perPageRequest){
            parameters += "&perPage=" + perPage;
        }

        var result = $http.get(serviceUrl + obj.methodLink + '/' + "getall?" + parameters, {headers: {'X-Auth-Token': session}});
        result.success(function (data) { // the $scope.user data will not passed as parameter but as request-header 
            if (data.statusCode === "UNAUTHORIZED") {
                $window.location.href = setting.connection.webURL + 'login.html'; // to navigate to the main Page
            }
        });
        
        return result;
    };
    
    obj.getAllCustom = function (method) {
         var result = $http.get(serviceUrl + method + '/' + "getall", {headers: {'X-Auth-Token': session}});
          result.success(function (data) { // the $scope.user data will not passed as parameter but as request-header 
            if (data.statusCode === "UNAUTHORIZED") {
                $window.location.href = setting.connection.webURL + 'login.html'; // to navigate to the main Page
            }
     });
        return result;
    };
  obj.getData = function (path,params) { // params =  {"id": "10", "name" : "John,Martin"}
            var result= $http.get(serviceUrl + path , {headers: {'X-Auth-Token': session},params:params});
       result.success(function (data) { // the $scope.user data will not passed as parameter but as request-header 
            if (data.statusCode === "UNAUTHORIZED") {
                $window.location.href = setting.connection.webURL + 'login.html'; // to navigate to the main Page

            }
     });
        return result;
    };
    obj.add = function (bean) {
        return $http.post(serviceUrl + obj.methodLink + '/' + "add", bean, {headers: {'X-Auth-Token': session}});

    };
  obj.customMethod = function (method,bean) {
        var result= $http.post(serviceUrl + obj.methodLink + '/' + method, bean, {headers: {'X-Auth-Token': session}});

        result.success(function (data) { // the $scope.user data will not passed as parameter but as request-header 
            if (data.statusCode === "UNAUTHORIZED") {
                $window.location.href = setting.connection.webURL + 'login.html'; // to navigate to the main Page

            }
     });
        return result;
    };
    obj.update = function (bean) {
        return $http.post(serviceUrl + obj.methodLink + '/' + "update", bean, {headers: {'X-Auth-Token': session}});
    };
    obj.getVoisByOrg = function (search) {
        return $http.post(serviceUrl + "violation/search", search, {headers: {'X-Auth-Token': session}});
    };
    obj.postCustom = function (url,bean){
        return $http.post(serviceUrl+url , bean , {headers: { 'X-Auth-Token': session}});
    };
    obj.get = function (id) {
        var result = $http.get(serviceUrl + obj.methodLink + '/' + "get?id=" + id, {headers: {'X-Auth-Token': session}});
        result.success(function (data) { // the $scope.user data will not passed as parameter but as request-header 
            if (data.statusCode === "UNAUTHORIZED") {
                $window.location.href = setting.connection.webURL + 'login.html'; // to navigate to the main Page

            }

        });

        return result;
    };
    obj.get = function (method, id) {
//        console.log('testa'+id);
        var result = $http.get(serviceUrl + method + '/' + "get?id=" + id, {headers: {'X-Auth-Token': session}});
        result.success(function (data) { // the $scope.user data will not passed as parameter but as request-header 
            if (data.statusCode === "UNAUTHORIZED") {
                $window.location.href = setting.connection.webURL + 'login.html'; // to navigate to the main Page

            }

        });

        return result;
    };
    obj.deleteBean = function (id) {
        return $http.get(serviceUrl + obj.methodLink + '/' + "delete?id=" + id, {headers: {'X-Auth-Token': session}});
    };

    return obj;
});
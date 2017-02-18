/**
 * Created by Haytham on 11/23/2015.
 */

app.factory('VISITServices' ,function($http,setting){

    var obj = {};
    obj.methodLink = '';
    
    var serviceUrl = setting.connection.url;
    var session = setting.connection.sessionId;
    
    obj.getAll = function (){
        return $http.get(serviceUrl+obj.methodLink+'/'+"getall", {headers: { 'X-Auth-Token': session}});
    };
    obj.getAllCustom = function (method){
        return $http.get(serviceUrl+method+'/'+"getall", {headers: { 'X-Auth-Token': session}});
    };

    obj.add = function (bean){
        return $http.post(serviceUrl+obj.methodLink+'/'+"add" , bean, {headers: { 'X-Auth-Token': session}});

    };
 
    obj.update = function (bean){
        return $http.post(serviceUrl+obj.methodLink+'/'+"update" , bean , {headers: { 'X-Auth-Token': session}});
    };
    obj.getWithDate = function (bean){
        return $http.post(serviceUrl+'visit/'+"get-by-date-range" , bean , {headers: { 'X-Auth-Token': session}});
    };

    obj.get = function (id) {
        return $http.get(serviceUrl+obj.methodLink+'/'+"get?id="+id, {headers: { 'X-Auth-Token': session}});
    };
    obj.get = function (method,id) {
        return $http.get(serviceUrl+method+'/'+"get?id="+id, {headers: { 'X-Auth-Token': session}});
    };
    obj.deleteBean = function(id){
        return $http.get(serviceUrl+obj.methodLink+'/'+"delete?id="+id, {headers: { 'X-Auth-Token': session}});
    };

    return obj ;
});
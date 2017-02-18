/**
 * Created by Haytham on 11/23/2015.
 */

app.factory('UserServices' ,function($http,setting){

    var obj = {};
    
    var serviceUrl = setting.connection.url;
    var session = setting.connection.sessionId;
    
    

    obj.login = function (bean){
        return $http.post(serviceUrl+'auth/login' ,'', {headers: { 'X-User-Name': bean.name,'X-Password': bean.password,'X-Login':0}});

    };
 
    

    return obj ;
});
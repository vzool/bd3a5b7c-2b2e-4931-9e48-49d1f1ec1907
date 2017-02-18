// Code goes here

var myApp = angular.module('myApp', ['datatables']);

myApp.controller('tableTestCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', function($scope, DTOptionsBuilder, DTColumnBuilder){
  
  var dd = [];
  dd = [
    {"Img": "http://img.banggood.com/thumb/other_items/upload/2012/liangping/animal%20head%20masks-011%20(4).jpg", "Name": "Tiger Nixon", "Age": "61", "addr1": "234 My addr 1", "addr2": "234 My addr 2"},
    {"Img": "http://a.deviantart.net/avatars/a/n/animal-animes.png", "Name": "Garrett Winters","Age": "63", "addr1": "235 My addr 1", "addr2": "235 My addr 2"}
  ];   
  
  $scope.dtColumns = [
    DTColumnBuilder.newColumn('addr1').withTitle('Address 1'),
    DTColumnBuilder.newColumn('addr2').withTitle('Address 2'),
    DTColumnBuilder.newColumn(null).withTitle('Full Address').renderWith(addressHtml),
    DTColumnBuilder.newColumn('Img').withTitle('Image'),
    DTColumnBuilder.newColumn('Name').withTitle('Name'),
    DTColumnBuilder.newColumn('Age').withTitle('Age')
  ];
  
  $scope.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('data', dd);
  
  function addressHtml(data, type, full, meta) {
        return data.addr1 + ' - ' + data.addr2;
    }
  
  console.log($scope.dtOptions);
 
  
}])
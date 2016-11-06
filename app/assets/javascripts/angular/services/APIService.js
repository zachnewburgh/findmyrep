function APIService($http) {

  this.getFederal = function(zip) {
    return $http.get('https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zip + '&apikey=b499f90c9a1643f4a6fc2f6b9f21c25b');
  };

  this.getZip = function() {
    return $http.get("https://ipinfo.io");
  }
}

angular
  .module('app')
  .service('APIService', APIService);
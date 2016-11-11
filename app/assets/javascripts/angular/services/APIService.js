APIService = ['$http', function($http) {

  this.getFederal = function(lat, lng) {
    return $http.get('https://congress.api.sunlightfoundation.com/legislators/locate?origin=*&latitude=' + lat + '&longitude=' + lng + '&apikey=' + sunlight_key);
  };

  this.getCoordinates = function(address) {
    return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ address + "&key=" + google_key, {headers: {Authorization: undefined}})
  };

}];

angular
  .module('app')
  .service('APIService', APIService);
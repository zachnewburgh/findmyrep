HomeController = ['APIService', '$http', function(APIService, $http) {
  
  var ctrl = this;
  ctrl.address = "number and street name, city, state and zip code"

  ctrl.formSubmit = function() {
    
    var address = ctrl.address;
    APIService.getCoordinates(address)
      .then(function (response) {
        var lat = response.data.results[0].geometry.location.lat
        var lng = response.data.results[0].geometry.location.lng

        APIService.getFederal(lat, lng)
          .then(function(response) {
            ctrl.politicians = response.data.results;
            ctrl.politicians.forEach(function(p) {
              $http.get("https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=" + p.first_name + " " + p.last_name + "&format=json")
                .then(function(response) {
                  title = response.data.query.search[0].title;
                  $http.get("https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=images&format=json&titles=" + title)
                    .then(function(response) {
                      arr = [];
                      images = Object.values(response.data.query.pages)[0].images
                      images.forEach(function(img) {
                        var regex = new RegExp(p.last_name.toLowerCase(), "i");
                        img.title.search(regex) !== -1 ? arr.push(img.title) : null;
                      })
                      image = arr[0];
                      $http.get("https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&titles=" + image + "&prop=imageinfo&iiprop=url")
                        .then(function(response) {
                          p.image_url = Object.values(response.data.query.pages)[0].imageinfo[0].url;
                        });
                    });
                });
            });
          });
      });
  };


}];

angular
  .module('app')
  .controller('HomeController', HomeController);
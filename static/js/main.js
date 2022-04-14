var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var queryUrl = "http://127.0.0.1:5000/test"

d3.json(queryUrl).then(function (data) {

  for (var i = 0; i < 11; i++) {

    // Set the data location property to a variable.
    var latitude = data[i].city_latitude;
    var longitude = data[i].city_longitude;
    var cities = data[i].city
    // Check for the location property.
    if (latitude, longitude) {

      // Add a new marker to the cluster group, and bind a popup.
      L.marker([latitude, longitude])
        .bindPopup(`<h1>${data[i].state}</h1><h2>${data[i].city}</h2> <hr> <h3>UFO Shape: ${data[i].shape}</h3>`)
        .addTo(myMap)
    }

  }

  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);

});
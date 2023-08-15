var map = L.map('map').setView([40.7128, -74.0060], 12); // New York City coordinates

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

fetch('https://api.npoint.io/f26432e9e880999eeb1b') // API URL
  .then(response => response.json())
  .then(data => {
    var geojsonFeatures = data.map(building => ({
      type: 'Feature',
      properties: {
        name: building.name
      },
      geometry: {
        type: 'Point',
        coordinates: [building.longitude, building.latitude]
      }
    }));

    geojsonFeatures.forEach(feature => {
      var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]).addTo(map);
      feature.properties._marker = marker; // Store the marker reference
      marker.bindPopup('Building Name: ' + feature.properties.name);
    });

    const DISTANCE_THRESHOLD = 0.01; // Adjust this value as needed

    geojsonFeatures.forEach(feature => {
      var marker = feature.properties._marker;
      var nearbyMarkers = geojsonFeatures.filter(otherFeature =>
        turf.distance(
          feature.geometry.coordinates,
          otherFeature.geometry.coordinates
        ) < DISTANCE_THRESHOLD
      );

      if (nearbyMarkers.length > 1) {
        marker.setIcon(L.icon({
          iconUrl: 'red-marker-icon.png', // Red marker icon URL
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        }));
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));

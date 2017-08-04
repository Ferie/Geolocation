// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

var map, marker, infoWindow;
var geolocationInfo = document.getElementById("geolocation");

function initMap() {
    var startingLatLng = {lat: -33.890542, lng: 151.274856}; // Bondi Beach, Sydney, Australia

    map = new google.maps.Map(document.getElementById('map'), {
        center: startingLatLng,
        zoom: 8
    });

    infoWindow = new google.maps.InfoWindow;

    // Check HTML5 geolocation
    if (navigator.geolocation) {
        // Device APIs are available
        navigator.geolocation.getCurrentPosition(showGeolocation, function (error) {
            handleLocationError(true, infoWindow, map.getCenter(), error);
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter(), false);
    }
}

// Geolocation request succeeded
function showGeolocation(position) {
    var image = {
//        url: 'images/map-markers/location_map_orange_breaking_base.png',
//        url: 'images/map-markers/orange-google-maps-pin-with-orange-shadow-hi.png',
//        url: 'images/map-markers/red-pin-icon-17900.jpg',
        url: 'images/map-markers/push-pin-icon-17898.png',
        size: new google.maps.Size(100, 100),
//        origin: new google.maps.Point(0, 0),
//        anchor: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(100, 100)
    };
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: image
    });
    marker.setMap(map);

    infoWindow.setPosition(pos);
    infoWindow.setContent('<h1>Location found!</h1>' +
            '<b>Latitude</b>: ' + position.coords.latitude + '<br>' +
            '<b>Longitude</b>: ' + position.coords.longitude);
    infoWindow.open(map, marker);

    map.setCenter(pos);
    map.setZoom(16);

    geolocationInfo.innerHTML = 'Latitude: ' + position.coords.latitude + '<br>' +
            'Longitude: ' + position.coords.longitude + '<br>' +
            'Altitude: ' + position.coords.altitude + '<br>' +
            'Accuracy: ' + position.coords.accuracy + '<br>' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br>' +
            'Heading: ' + position.coords.heading + '<br>' +
            'Speed: ' + position.coords.speed + '<br>' +
            'Timestamp: ' + position.timestamp + '<br>';
}

// Handle Geolocation errors
function handleLocationError(browserHasGeolocation, infoWindow, pos, allowanceError) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);

    allowanceError ? geolocationInfo.innerHTML = 'Error code: ' + allowanceError.code + '<br>' +
            'Error message: ' + allowanceError.message + '<br>' :
            geolocationInfo.innerHTML = 'Geolocation is not supported by this browser.';
}
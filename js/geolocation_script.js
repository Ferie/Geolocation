function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState != 'loading')
                fn();
        });
    }
}

ready(function () {
    var element = document.getElementById("geolocation");
    getLocation();

    function getLocation() {
        if (navigator.geolocation)
            // device APIs are available
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        else
            element.innerHTML = 'Geolocation is not supported by this browser.';
    }

    // onSuccess Geolocation
    function showPosition(position) {
        element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br>' +
                'Longitude: ' + position.coords.longitude + '<br>' +
                'Altitude: ' + position.coords.altitude + '<br>' +
                'Accuracy: ' + position.coords.accuracy + '<br>' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br>' +
                'Heading: ' + position.coords.heading + '<br>' +
                'Speed: ' + position.coords.speed + '<br>' +
                'Timestamp: ' + position.timestamp + '<br>';
    }

    // onError Callback receives a PositionError object
    function showError(error) {
        element.innerHTML = 'code: ' + error.code + '<br>' +
                'message: ' + error.message + '<br>';
    }
});
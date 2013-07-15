// Set this up for later
//var location;
var gMapsBaseUrl = 'http://maps.google.com/maps?q=loc:';

// Wait for the device APIs to be ready
document.addEventListener("deviceready", onDeviceReady, false);

// When the device APIs are online, let's get the location
function onDeviceReady() {
    //findLocation();
    // @TODO Find some way to enable the functions when the device is ready
}

function findLocation() {
    navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError, {
        enableHighAccuracy: true, // Get an accurate result, weirdness though
        maximumAge: 3000, // Require a location with at most 3s out of date
        timeout: 7000 // Wait up to 7 seconds for the location
    });
}

// On success
function onGetLocationSuccess(position) {
    
    // Save the returned position
    window.localStorage.setItem('last_position', JSON.stringify(position));
    
    var status = document.getElementById('status');
    status.innerHTML = 'Location found: ' + position.coords.latitude + ', ' + position.coords.longitude + ' with accuracy ' + position.coords.accuracy + '.';
}

// On error
function onGetLocationError(error) {
    alert('Error getting location' + error.code + ': ' + error.message);
}

// Find and store our location
function park() {
    var status = document.getElementById('status');
    status.innerHTML = 'searching';
    findLocation();
}

// Show our location on a map
function find() {
    
    // Retrieve our last position
    var position = JSON.parse(window.localStorage.getItem('last_position'));
    
    // Tell the user how long ago they parked
    timeDiff = Math.round((Date.now() - position.timestamp)/1000);
    navigator.notification.confirm('Location saved ' + timeDiff + 's ago. Map it?', function(buttonIndex){
        // If the user chose Yes, button 1
        if (buttonIndex == 1) {
            // Redirect to a google maps link
            window.open(gMapsBaseUrl + position.coords.latitude + ',' + position.coords.longitude, '_system');
        }
    }, 'Map it?', 'Yes,No');
    
    
    //window.open(document.getElementById('mapUrl').innerHTML, '_system');
    
}

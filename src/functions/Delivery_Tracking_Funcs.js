function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function update_location(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/delivery/locationUpdate", {
		method: "POST",
		headers: { 'Accept': "application/json", "Content-Type": "application/json", },
		body: JSON.stringify(details),
	});
}

function getCurrent(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/delivery/locationUpdate", {
		method: "POST",
		headers: { 'Accept': "application/json", "Content-Type": "application/json", },
		body: JSON.stringify(details),
	});
}


var DeliveryTrackingFuncs = {
	distanceRemaining: getDistanceFromLatLonInKm,
	updateLocation: update_location
}

export {DeliveryTrackingFuncs as DeliveryTrackingFuncs}

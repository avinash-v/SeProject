function login_verification(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/user/validateUser", {
		method: 'POST',
		headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
		body: JSON.stringify(details),
	});
}

function register_user(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/user/registerUser", {
		method: "POST",
		headers: { 'Accept': "application/json", "Content-Type": "application/json", },
		body: JSON.stringify(details),
	});
}

function update_location(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/delivery/locationUpdate", {
		method: "POST",
		headers: { 'Accept': "application/json", "Content-Type": "application/json", },
		body: JSON.stringify(details),
	});
}

var LoginFunctions = {
	verify: login_verification,
	register: register_user,
	updateLocation: update_location
}

export {LoginFunctions as LoginFunctions}

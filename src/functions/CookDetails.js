function getCookDetails(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/getCookDetails", {
		method: 'POST',
		headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
		body: JSON.stringify(details),
	});
}

function getNCookDetails(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/getNCookDetails", {
		method: "POST",
		headers: { 'Accept': "application/json", "Content-Type": "application/json", },
		body: JSON.stringify(details),
	});
}

function addCookDetails(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/addCookDetails", {
		method: "POST",
		headers: { 'Accept': "application/json", "Content-Type": "application/json", },
		body: JSON.stringify(details),
	});
}

var CookDetails = {
	getCookDetails: getCookDetails,
	getNCookDetails: getNCookDetails,
	addCookDetails:addCookDetails
}

export {CookDetails as CookDetails}
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

var GetDetails = {
	getCookDetails: getCookDetails,
	getNCookDetails: getNCookDetails,
}

export {GetDetails as GetDetails}
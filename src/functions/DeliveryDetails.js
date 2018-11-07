function getDerliveryDetails(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/getDerliveryDetails", {
		method: 'POST',
		headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
		body: JSON.stringify(details),
	});
}

function getNDerliveryDetails(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/getNDerliveryDetails", {
		method: "POST",
		headers: { 'Accept': "application/json", "Content-Type": "application/json", },
		body: JSON.stringify(details),
	});
}

function addDeliveryDetails(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/addDeliveryDetails", {
		method: "POST",
		headers: { 'Accept': "application/json", "Content-Type": "application/json", },
		body: JSON.stringify(details),
	});
}

var DeliveryDetails = {
	getDerliveryDetails: getDerliveryDetails,
    getNDerliveryDetails: getNDerliveryDetails,
    addDeliveryDetails:addDeliveryDetails
}

export {DeliveryDetails as DeliveryDetails}
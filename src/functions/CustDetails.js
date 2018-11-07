function getCustomerDetails(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/getCustomerDetails", {
		method: 'POST',
		headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
		body: JSON.stringify(details),
	});
}

function getNCustomerDetails(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/getNCustomerDetails", {
		method: "POST",
		headers: { 'Accept': "application/json", "Content-Type": "application/json", },
		body: JSON.stringify(details),
	});
}

function addCustomerDetails(serverIP, serverPort, details) {
	return fetch("http://" + serverIP + ":" + serverPort + "/addCustomerDetails", {
		method: "POST",
		headers: { 'Accept': "application/json", "Content-Type": "application/json", },
		body: JSON.stringify(details),
	});
}

var CustDetails = {
	getCustomerDetails: getCustomerDetails,
    getNCustomerDetails: getNCustomerDetails,
    addCustomerDetails:addCustomerDetails
}

export {CustDetails as CustDetails}
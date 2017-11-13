import BACKEND_HEADER, { BACKEND_PUBLIC_DNS, BACKEND_PORT } from '../constants/common';

export const asyncGetWithJson = async (
	endpoint,
	jsonParameters,
	callback,
	publicDNS = BACKEND_PUBLIC_DNS,
	port = BACKEND_PORT,
	header = BACKEND_HEADER
) => {
	try {
		const parameterString = Object.entries(jsonParameters).map(query => query.join('=')).join('&');
		const queryString = `${publicDNS}:${port}/${endpoint}?${parameterString}`;
		const response = await fetch(queryString, {
			method: 'GET',
			headers: header
		});
		const responseJson = await response.json();
		return responseJson;
	} catch (error) {
		callback();	
	}
}

export const asyncPostWithJson = async (
	endpoint,
	jsonPayload,
	callback,
	publicDNS = BACKEND_PUBLIC_DNS,
	port = BACKEND_PORT,
	header = BACKEND_HEADER
) => {
	try {
		const queryString = `${publicDNS}:${port}/${endpoint}`;
		console.log(queryString);
		const response = await fetch(queryString, {
			method: 'POST',
			headers: header,
			body: JSON.stringify(jsonPayload)			
		});
		const responseJson = await response.json();
		return responseJson;
	} catch (error) {
		callback();	
	}
}

export const asyncDeleteWithJson = async (
	endpoint,
	jsonPayload,
	callback,
	publicDNS = BACKEND_PUBLIC_DNS,
	port = BACKEND_PORT,
	header = BACKEND_HEADER
) => {
	try {
		const queryString = `${publicDNS}:${port}/${endpoint}`;
		const response = await fetch(queryString, {
			method: 'DELETE',
			headers: header,
			body: JSON.stringify(jsonPayload)			
		});
		return response;
	} catch (error) {
		callback();	
	}
}

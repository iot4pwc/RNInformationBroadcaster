import BACKEND_HEADER, { BACKEND_PUBLIC_DNS, BACKEND_PORT } from '../constants/common';

export const asyncGetWithJson = async (
	endpoint,
	jsonParameters,
	callback = () => {},
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
		let code = await response.status;
		if (code !== 200) {
			callback();
		}		
		const responseJson = await response.json();
		return responseJson;
	} catch (error) {
		callback();	
	}
}

export const asyncPost = async (
	endpoint,
	jsonPayload,
	callback = () => {},
	publicDNS = BACKEND_PUBLIC_DNS,
	port = BACKEND_PORT,
	header = BACKEND_HEADER
) => {
	try {
		const queryString = `${publicDNS}:${port}/${endpoint}`;
		const response = await fetch(queryString, {
			method: 'POST',
			headers: header,
			body: JSON.stringify(jsonPayload)			
		});
		let code = await response.status;
		if (code !== 200) {
			callback();
		}
	} catch (error) {
		callback();	
	}
}

export const asyncPostWithJson = async (
	endpoint,
	jsonPayload,
	callback = () => {},
	publicDNS = BACKEND_PUBLIC_DNS,
	port = BACKEND_PORT,
	header = BACKEND_HEADER
) => {
	try {
		const queryString = `${publicDNS}:${port}/${endpoint}`;
		const response = await fetch(queryString, {
			method: 'POST',
			headers: header,
			body: JSON.stringify(jsonPayload)			
		});
		let code = await response.status;
		if (code !== 200) {
			callback();
		}		
		const responseJson = await response.json();
		return responseJson;
	} catch (error) {
		callback();	
	}
}

export const asyncDeleteWithJson = async (
	endpoint,
	jsonPayload,
	callback = () => {},
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
		let code = await response.status;
		if (code !== 200) {
			callback();
		}		
		return response;
	} catch (error) {
		callback();	
	}
}

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
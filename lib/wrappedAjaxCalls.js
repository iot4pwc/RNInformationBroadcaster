import { BACKEND_PUBLIC_DNS, BACKEND_PORT } from '../constants/common';

export const asyncGetWithJson = async (
	endpoint,
	jsonParameters,
	publicDNS = BACKEND_PUBLIC_DNS,
	port = BACKEND_PORT
) => {
	try {
		const parameterString = Object.entries(jsonParameters).map(query => query.join('=')).join('&');
		const queryString = `${publicDNS}:${port}/${endpoint}?${parameterString}`;
		const response = await fetch(queryString);
		const responseJson = await response.json();
		return responseJson;
	} catch (error) {
		console.error(error);
	}
}
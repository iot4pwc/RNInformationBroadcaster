import RNFetchBlob from 'react-native-fetch-blob'

export const encodeImage = (uri) => {
	const Blob = RNFetchBlob.polyfill.Blob
	RNFetchBlob.fs.readFile(uri, 'base64')
		.then(data => Blob.build(data, { type : 'Image' })
			.then(blob => console.log(blob)))
}

import RNFetchBlob from 'react-native-fetch-blob';
import ImageResizer from 'react-native-image-resizer';

export const encodeImage = async (uri) => {
	try {
		const response = await ImageResizer.createResizedImage(uri, 800, 600, 'JPEG', 75);
		const base64Content = await RNFetchBlob.fs.readFile(response.uri, 'base64');
		return `data:image/jpeg;base64,${base64Content}`;
	} catch (error) {
		console.err(error);
	}
}

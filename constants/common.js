import { Dimensions } from 'react-native';

export const PHOTO_NUM = 100;
export const CHECKIN_COLOR = '#b94a48';
export const HOST_CHECKIN_COLOR = '#3a87ad';
export const LOADING_GIF_URL = './lading.gif';

export const PROFILE_PREFIX = '@Profile:';
export const BACKEND_PUBLIC_DNS = 'http://ec2-13-59-238-24.us-east-2.compute.amazonaws.com';
export const BACKEND_PORT = 8080;
export const BACKEND_HEADER_KEY = 'secretKey';
export const BACKEND_HEADER_VALUE = 'secretValue';
// only way to export object with a dynamic key
let BACKEND_HEADER = {}
BACKEND_HEADER[BACKEND_HEADER_KEY] = BACKEND_HEADER_VALUE
export default BACKEND_HEADER;

const { WIDTH, HEIGHT } = Dimensions.get('window');
export const Layout = {
	width: WIDTH,
	height: HEIGHT
}

export const ProfileMap = {
	user_email: PROFILE_PREFIX + "user_email",
	firstName: PROFILE_PREFIX + "firstName",
	lastName: PROFILE_PREFIX + "lastName",
	age: PROFILE_PREFIX + "age",
	resumeLink: PROFILE_PREFIX + "resumeLink",
	profilePicture: PROFILE_PREFIX + "profilePicture",
	position: PROFILE_PREFIX + "position",
	company: PROFILE_PREFIX + "company"
};

export const ProfileAttributesList = [
	'firstName',
	'lastName',
	'age',
	'company',
	'position',
	'user_email',
	'resumeLink'
];

export const DBProfileAttrMap = {
	'firstName': 'FIRST NAME',
	'lastName': 'LAST NAME',
	'age': 'AGE',
	'company': 'COMPANY',
	'position': 'POSITION',
	'user_email': 'EMAIL',
	'resumeLink': 'RESUME LINK'
}

export const MeetingRoomAttrDBMap = {
	roomId: 'room_id',
	roomName: 'room_name',
	uuid: 'uuid'
}

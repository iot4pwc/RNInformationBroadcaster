export const PHOTO_NUM = 100;
export const CHECKIN_COLOR = '#b94a48';
export const HOST_CHECKIN_COLOR = '#3a87ad';

const ProflePrefix = '@Profile:';

export const ProfileMap = {
	user_email: ProflePrefix + "user_email",
	firstName: ProflePrefix + "firstName",
	lastName: ProflePrefix + "lastName",
	age: ProflePrefix + "age",
	resumeLink: ProflePrefix + "resumeLink",
	profilePicture: ProflePrefix + "profilePicture",
	position: ProflePrefix + "position",
	company: ProflePrefix + "company"
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


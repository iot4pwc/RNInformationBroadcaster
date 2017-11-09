import * as FilesActions from './files';
import * as PeopleActions from './people';
import * as ProfileActions from './profile';
import * as RoomActions from './room';
import * as RoomInfoActions from './roomInfo';
import * as WelcomeActions from './welcome';

export default Object.assign({},
	FilesActions,
	PeopleActions,
	ProfileActions,
	RoomActions,
	RoomInfoActions,
	WelcomeActions
);

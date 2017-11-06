import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

export default class ProfileForm extends React.Component {
	render() {
		const{ header, content, onChangeText, refFunc, onSubmitEditing } = this.props;
		const errMessage = '*This is a required field';

		return (
			<View>
				<FormLabel labelStyle={styles.labelStyle}>{header}</FormLabel>
				<FormInput
					onChangeText={(newContent) => onChangeText(newContent)}
					ref={(ref) => refFunc(ref)}
					onSubmitEditing={onSubmitEditing}
					value={content}
				/>
				<FormValidationMessage
					labelStyle={content ? styles.invisibleErrMsgStyle : styles.visibleErrMsgStyle}>
					{errMessage}
				</FormValidationMessage>			
			</View>
		);

	}
}

ProfileForm.propTypes = {
	header: PropTypes.string.isRequired,
	content: PropTypes.string,
	onChangeText: PropTypes.func.isRequired,
	refFunc: PropTypes.func.isRequired,
	onSubmitEditing: PropTypes.func
}

const styles = StyleSheet.create({
  labelStyle: {
    marginTop: 12,
    fontSize: 16
  },
  visibleErrMsgStyle: {
  	color: 'sienna'
  },
  invisibleErrMsgStyle: {
  	display: 'none'
  }
});

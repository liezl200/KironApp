'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js');
const constants = styles.constants;
const {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} = ReactNative;

class ActionButton extends Component {
	render() {
		return (
			<View style = {styles.action}>
				<TouchableOpacity
					underlayColor = {constants.actionColor}
					onPress = {this.props.onPress}>
					<Text style = {styles.actionText}> {this.props.title} </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

module.exports = ActionButton;
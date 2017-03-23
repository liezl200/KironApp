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

class Tag extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      selected: this.props.subscribed
	    };
	  }

	_toggleSelected() {
		this.props.onPress();
		this.setState({selected:!this.state.selected});
	}
	render() {


		if (this.state.selected) {
			return (
				<View style = {styles.action}>
					<TouchableOpacity
						underlayColor = {constants.actionColor}
						onPress = {this._toggleSelected.bind(this)}>
						<Text style = {styles.actionText}> {this.props.text} </Text>
					</TouchableOpacity>
				</View>
			);
		}
		return (
				<View style = {styles.action2}>
					<TouchableOpacity
						underlayColor = {constants.actionColor2}
						onPress = {this._toggleSelected.bind(this)}>
						<Text style = {styles.actionText}> {this.props.text} </Text>
					</TouchableOpacity>
				</View>
				);
	}
}

module.exports = Tag;
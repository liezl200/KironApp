import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const styles = require('../styles.js');

const Spinner = () => {
	return (
		<View styles={styles.spinner}>
			<ActivityIndicator size={this.props.size || large} />
		</View>
	);
};

module.exports = Spinner;
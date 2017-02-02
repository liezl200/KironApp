import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const styles = require('../styles.js');

const Spinner = ({size}) => {
	return (
		<View style={styles.spinner}>
			<ActivityIndicator size={size} />
		</View>
	);
};

module.exports = Spinner;
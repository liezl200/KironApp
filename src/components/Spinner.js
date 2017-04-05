import React, { PropTypes } from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from '../styles';

const propTypes = {
  size: PropTypes.string.isRequired,
};

function Spinner(props) {
  return (
    <View style={styles.spinner}>
      <ActivityIndicator size={props.size} />
    </View>
  );
}
Spinner.propTypes = propTypes;
module.exports = Spinner;

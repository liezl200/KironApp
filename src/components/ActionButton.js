import React, { PropTypes } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles';

const constants = styles.constants;

const propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

function ActionButton(props) {
  return (
    <View style={styles.action}>
      <TouchableOpacity
        underlayColor={constants.actionColor}
        onPress={props.onPress}
      >
        <Text style={styles.actionText}> {props.title} </Text>
      </TouchableOpacity>
    </View>
  );
}

ActionButton.propTypes = propTypes;

module.exports = ActionButton;

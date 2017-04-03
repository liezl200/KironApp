import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

const styles = require('../styles.js');

const constants = styles.constants;

const propTypes = {
  subscribed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.subscribed,
    };

    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected() {
    this.props.onPress();
    this.setState({ selected: !this.state.selected });
  }

  render() {
    if (this.state.selected) {
      return (
        <View style={styles.action}>
          <TouchableOpacity
            underlayColor={constants.actionColor}
            onPress={this.toggleSelected}
          >
            <Text style={styles.actionText}> {this.props.text} </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.action2}>
        <TouchableOpacity
          underlayColor={constants.actionColor2}
          onPress={this.toggleSelected}
        >
          <Text style={styles.actionText}> {this.props.text} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
Tag.propTypes = propTypes;
module.exports = Tag;

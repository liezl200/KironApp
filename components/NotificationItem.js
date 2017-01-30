import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

class NotificationItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.notifContainer}>
          <View style={styles.notifItem}>
          	<Text style={styles.liText}>{this.props.notif.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = NotificationItem;
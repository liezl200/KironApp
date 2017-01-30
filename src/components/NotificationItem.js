import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text } = ReactNative;

import {
  Icon
} from 'react-native-elements';

class NotificationItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.notifContainer}>
          <View style={styles.notifItem}>

            <View style={styles.notifItemContent}>
            	<Text style={styles.notifItemTitle}>{this.props.notif.title}</Text>
              <Text style={styles.notifItemText}>{this.props.notif.text}</Text>
            </ View>

            <View style={styles.notifItemChevron}>
              <Icon
                name= 'chevron-right' color='#444' />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = NotificationItem;
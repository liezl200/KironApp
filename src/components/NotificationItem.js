import React, {Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Swipeout from 'react-native-swipe-out';
import {
  Icon
} from 'react-native-elements';
const styles = require('../styles.js');


class NotificationItem extends Component {

  render() {
    var swipeoutBtns = [{text: 'Archive', backgroundColor: '#FF1919', onPress: this.props.onArchivePress }];
    return (
      <Swipeout
        right={swipeoutBtns}
        backgroundColor={'#f2f2f2'}>

        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.notifContainer}>
            <View style={styles.notifItem}>

              <View style={styles.notifItemIndicatorContainer}>
                {!this.props.notif.read &&
                  <Icon
                    size={10}
                    color="#001E8C"
                    name='fiber-manual-record' />
                }
              </View>

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
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

module.exports = NotificationItem;
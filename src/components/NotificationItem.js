import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import {
  Icon,
} from 'react-native-elements';

import styles from '../styles';

const propTypes = {
  onPress: PropTypes.func.isRequired,
  notif: PropTypes.object.isRequired,
};

function NotificationItem(props) {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.notifContainer}>
          <View style={styles.notifItem}>

            <View style={styles.notifItemIndicatorContainer}>
              {!props.notif.read &&
                <Icon
                  size={10}
                  color="#2599b2"
                  name="fiber-manual-record"
                />
              }
            </View>

            <View style={styles.notifItemContent}>
              <View>
                <Text style={styles.notifItemTitle} numberOfLines={1}>{props.notif.title}</Text>
                <Text style={styles.notifItemText} numberOfLines={2}>{props.notif.text}</Text>
              </View>
            </View>

            <View style={styles.notifItemChevron}>
              <Icon
                name="chevron-right"
                color="#444"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

NotificationItem.propTypes = propTypes;
module.exports = NotificationItem;

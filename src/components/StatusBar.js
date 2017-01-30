'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { StyleSheet, Text, View} = ReactNative;
import {Grid, Col, Row} from 'react-native-elements';
class StatusBar extends Component {
  render() {
    return (
      <View>

        <View style={styles.statusbar}>
          <Text>{this.props.user.email}</Text>
        </View>
        <View style={styles.navbar}>

          <Text style={styles.navbarTitle}>{this.props.title}</Text>
        </View>
        <View style={styles.navbarIcon}>
          {this.props.menuButton}
        </View>
      </View>
    );
  }
}

module.exports = StatusBar;
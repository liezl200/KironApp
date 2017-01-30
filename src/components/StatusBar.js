'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { StyleSheet, Text, View, Image} = ReactNative;

class StatusBar extends Component {
  render() {
    return (
      <View>

        <View style={styles.statusbar}>
          <Text style={styles.statusText}>{this.props.user.email}</Text>
        </View>
        <View style={styles.navbar}>

          <Text style={styles.navbarTitle}>{this.props.title}</Text>
        </View>
        <View style={styles.navbarIcon}>
          {this.props.menuButton}
        </View>
        <View style={styles.userAvatarContainer}>
          <Image style={styles.userAvatar} source={{uri:this.props.user.photo}} />
        </View>
      </View>
    );
  }
}

module.exports = StatusBar;
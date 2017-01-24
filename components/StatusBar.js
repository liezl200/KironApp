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
        <View style={styles.statusbar}/>
        <View style={styles.navbar}>
          <Grid>
            <Col>{this.props.menuButton}</Col>
            <Col>
              <Text style={styles.navbarTitle}>{this.props.title}</Text>
            </Col>
            <Col>
              <Row></Row>
              <Row></Row>
            </Col>
          </Grid>
        </View>
      </View>
    );
  }
}

module.exports = StatusBar;
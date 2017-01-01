'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  AlertIOS
  } from 'react-native';

// Import components
const StatusBar = require('./StatusBar');
const ActionButton = require('./ActionButton');
const ListNotif = require('./ListNotif');

const styles = require('../styles.js');

const firebaseApp = require('../modules/Firebase').firebaseApp;

class NotificationList extends Component {
	constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.notifsRef = this.getRef().child('notifs');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForNotifs(notifsRef) {
    notifsRef.on('value', (snap) => {

      // get children as an array
      var notifs = [];
      snap.forEach((child) => {
        notifs.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(notifs)
      });

    });
  }

  componentDidMount() {
    this.listenForNotifs(this.notifsRef);
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Notifications" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderNotif.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>

        <ActionButton onPress={this._addNotif.bind(this)} title="Add" />

      </View>
    )
  }

  _addNotif() {
    // AlertIOS.prompt(
    //   'Add New Notif',
    //   null,
    //   [
    //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //     {
    //       text: 'Add',
    //       onPress: (text) => {
    //         this.notifsRef.push({ title: text })
    //       }
    //     },
    //   ],
    //   'plain-text'
    // );
  }

  _renderNotif(notif) {

    const onPress = () => {
    	this.notifsRef.child(notif._key).remove();
      // AlertIOS.alert(
      //   'Complete',
      //   null,
      //   [
      //     {text: 'Complete', onPress: (text) => this.notifsRef.child(notif._key).remove()},
      //     {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
      //   ]
      // );
    };

    return (
      <ListNotif notif={notif} onPress={onPress} />
    );
  }

}

module.exports = NotificationList;
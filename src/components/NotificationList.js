'use strict';

import React, { Component } from 'react';
import {
  ListView,
  View,
} from 'react-native';

// Import custom components
const NotificationItem = require('./NotificationItem');
const NotificationModal = require('./NotificationModal');

const styles = require('../styles.js');

const firebaseApp = require('../modules/Firebase').firebaseApp;

class NotificationList extends Component {


  constructor(props) {
    super(props);

    this.state = {
      selectedNotif: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };

    this.notifsRef = firebaseApp.database().ref().child('notifs');
    this.allNotifsRef = firebaseApp.database().ref().child('allNotifs');
    console.log(this.props.firebaseUserKey);
    this.userNotifsRef = firebaseApp.database().ref()
      .child('users')
      .child(this.props.firebaseUserKey)
      .child('notifsInfo'); // TODO: does user.key exist?
    // this.notifsRef.keepSynced(true); // TODO(liezl): actually enable persistence natively
    // TODO(liezl): might have to find out how to explicitly force a sync when user requests reload

    // TESTING ONLY add some test data
    // var updates = {};
    // for (var i = 0; i < 15; i++) {
    //   var newNotifKey = firebaseApp.database().ref().child('notifs').push().key;
    //   updates['/notifs/' + newNotifKey] = {title: 'Test Notification Header ' + i, text: 'This is test text for notif '+ i};
    // }
    // firebaseApp.database().ref().update(updates);
  }



  listenForUserNotifs(userNotifsRef, notifsRef) { // TODO: fix allNotifs case?
    var appContext = this;
    userNotifsRef.on('value', (snap) => {
      var notifs = [];
      // STEP 1: get all this user's notifs from allNotifs and ungroupedNotifs {notifKey: {title: , text: , read: , starred: , archived: , _key: }}
      snap.child('ungroupedNotifs').forEach((ungroupedNotifKey) => { // ungroupedNotifKey.val() is each key in the user's ungroupedNotifs list
        notifsRef.child(ungroupedNotifKey.val())
          .on("value", function(ungroupedNotifsSnap) { // TODO: is this good for persistence?
            notifs.push({
              title: ungroupedNotifsSnap.val().title,
              text: ungroupedNotifsSnap.val().text,
              read: false,
              _key: ungroupedNotifsSnap.key
            })
            // STEP 2: set read, archived, and starred flags to all the notifs in the user's notifs
            // var flags = ['read', 'archived', 'starred']
            // flags.forEach(()
            // )
            console.log(notifs)
            appContext.setState({
              dataSource: appContext.state.dataSource.cloneWithRows(notifs)
            });
          })

      })




    });
  }

  componentDidMount() {
    this.listenForUserNotifs(this.userNotifsRef, this.notifsRef);
  }

  render() {
    return (
      <View style = {styles.container}>

        <NotificationModal ref='modal'/>

        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this._renderNotif.bind(this)}
          enableEmptySections={true}
          style = {styles.listview} />

      </View>
    )
  }

  _renderNotif(notif) {

    const onPress = () => {
      // Pop open notification modal.
      this.refs.modal._setModalVisible(true, notif);
      this.setState({
        selectedNotif: notif
      });
    }

    return (
      <NotificationItem notif={notif} onPress={onPress} />
    );
  }

}

module.exports = NotificationList;
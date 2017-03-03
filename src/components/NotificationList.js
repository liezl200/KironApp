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
      .child('notifsInfo');
    // this.notifsRef.keepSynced(true); // TODO(liezl): actually enable persistence natively
    // TODO(liezl): might have to find out how to explicitly force a sync when user requests reload
  }

  listenForUserNotifs(userNotifsRef, notifsRef) { // TODO: fix allNotifs case?
    var appContext = this;
    // TODO verify on vs once flows
    userNotifsRef.on('value', (snap) => {
      var notifs = [];
      var archivedNotifs = [];
      // STEP 1: get all this user's notifs from allNotifs and notifsInfo {notifKey: {title: , text: , read: , starred: , archived: , _key: }}
      snap.forEach((notifInfo) => { // notifInfo.val().key is each key of the notification in the user's notifInfo list
        console.log(notifInfo.val())
        var notifKey = notifInfo.val().notifKey;
        notifsRef.child(notifKey)
          .once("value", function(ungroupedNotifsSnap) { // use 'once' because notifications never get deleted from db (TODO: allow edit capabilities for the notification content)
            var listToPush = notifs;
            if(notifInfo.val().archived) {
              listToPush = archivedNotifs;
            }

            listToPush.push({
              title: ungroupedNotifsSnap.val().title,
              text: ungroupedNotifsSnap.val().text,
              read: notifInfo.val().read,
              archived: notifInfo.val().archived,
              starred: notifInfo.val().starred,
              notifKey: notifKey,
              _key: notifInfo.key // so we can easily modify the notifInfo in the db from the client
            });

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
      this.userNotifsRef.child(notif._key).child('read').set(true);
      this.refs.modal._setModalVisible(true, notif);
      this.setState({
        selectedNotif: notif
      });
    }

    const onArchivePress = () => {
      // Archives this notification.
      this.userNotifsRef.child(notif._key).child('archived').set(true);
    }

    return (
      <NotificationItem notif={notif} onPress={onPress} onArchivePress={onArchivePress}/>
    );
  }

}

module.exports = NotificationList;
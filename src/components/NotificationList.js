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



  listenForNotifs(notifsRef) {
    notifsRef.on('value', (snap) => {

      // get children as an array
      var notifs = [];
      snap.forEach((child) => {
        notifs.push({
          title: child.val().title,
          text: child.val().text,
          read: child.val().read,
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
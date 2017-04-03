import React, { Component, PropTypes } from 'react';
import {
  ListView,
  View,
} from 'react-native';

// Import custom components
const NotificationItem = require('./NotificationItem');
const NotificationModal = require('./NotificationModal');

const styles = require('../styles.js');

const firebaseApp = require('../modules/Firebase').firebaseApp;

const propTypes = {
  firebaseUserKey: PropTypes.string.isRequired,
};

class NotificationList extends Component {


  constructor(props) {
    super(props);

    this.state = {
      selectedNotif: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: () => true,
      }),
      rowToDelete: null,
    };

    this.notifsRef = firebaseApp.database().ref().child('notifs');
    this.allNotifsRef = firebaseApp.database().ref().child('allNotifs');
    this.userNotifsRef = firebaseApp.database().ref()
      .child('users')
      .child(this.props.firebaseUserKey)
      .child('notifsInfo');
    // this.notifsRef.keepSynced(true); // TODO(liezl): actually enable persistence natively
    // TODO(liezl): might have to find out how to explicitly force a sync when user requests reload
    this.renderNotif = this.renderNotif.bind(this);
  }

  componentDidMount() {
    this.listenForUserNotifs(this.userNotifsRef, this.notifsRef);
  }

  listenForUserNotifs(userNotifsRef, notifsRef) { // TODO: fix allNotifs case?
    const appContext = this;
    userNotifsRef.on('value', (snap) => {
      const notifs = [];
      const archivedNotifs = [];
      snap.forEach((notifInfo) => {
        // notifInfo.val().key is each key of the notification in the user's notifInfo list
        const notifKey = notifInfo.val().notifKey;
        notifsRef.child(notifKey)
          .once('value', (ungroupedNotifsSnap) => {
            let listToPush = notifs;
            if (notifInfo.val().archived) {
              listToPush = archivedNotifs;
            }

            listToPush.push({
              title: ungroupedNotifsSnap.val().title,
              text: ungroupedNotifsSnap.val().text,
              groups: ungroupedNotifsSnap.val().groups,
              timeSent: ungroupedNotifsSnap.val().timeSent,
              read: notifInfo.val().read,
              archived: notifInfo.val().archived,
              starred: notifInfo.val().starred,
              notifKey,
              key: notifInfo.key,
            });

            listToPush.sort((a, b) => (b.timeSent - a.timeSent));

            appContext.setState({
              dataSource: appContext.state.dataSource.cloneWithRows(notifs),
            });
          });
      });
    });
  }

  renderNotif(notif) {
    const onPress = () => {
      // Pop open notification modal.
      this.userNotifsRef.child(notif.key).child('read').set(true);
      this.modal.setModalVisible(true, notif);
      this.setState({
        selectedNotif: notif,
      });
    };

    const onArchivePress = () => {
      // Archives this notification.
      this.userNotifsRef.child(notif.key).child('archived').set(true);
    };

    return (
      <NotificationItem notif={notif} onPress={onPress} onArchivePress={onArchivePress} />
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <NotificationModal
          ref={(c) => { this.modal = c; }} // store reference to child modal
          firebaseUserKey={this.props.firebaseUserKey}
        />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderNotif}
          enableEmptySections
        />

      </View>
    );
  }
}
NotificationList.propTypes = propTypes;
module.exports = NotificationList;

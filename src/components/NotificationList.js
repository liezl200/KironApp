import React, { Component, PropTypes } from 'react';
import {
  ListView,
  View,
} from 'react-native';

// Import custom components
import NotificationItem from './NotificationItem';
import NotificationModal from './NotificationModal';

import styles from '../styles';

import firebaseApp from '../modules/Firebase';

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

  async listenForUserNotifs(userNotifsRef, notifsRef) { // TODO: fix allNotifs case?
    userNotifsRef.on('value', async (snap) => {
      const notifInfos = snap.val();
      const all = Object.keys(notifInfos).map(notifInfoKey => new Promise((resolve) => {
        const notifInfo = notifInfos[notifInfoKey];
        const notifKey = notifInfo.notifKey;
        notifsRef.child(notifKey).once('value', (ungroupedNotifsSnap) => {
          resolve({
            title: ungroupedNotifsSnap.val().title,
            text: ungroupedNotifsSnap.val().text,
            html: ungroupedNotifsSnap.val().html,
            timeSent: ungroupedNotifsSnap.val().timeSent,
            read: notifInfo.read,
            key: notifInfoKey,
          });
        });
      }));

      const notifs = await Promise.all(all);

      const sorted = notifs
        .filter(notification => !notification.archived)
        .sort((a, b) => (b.timeSent - a.timeSent));

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(sorted),
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
      <View style={styles.notificationListContainer}>

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

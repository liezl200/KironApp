'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableHighlight,
  StyleSheet,
  Text,
  ListView,
  View,
  } from 'react-native';

import {
  Button,
  List,
  ListItem,
  Icon,
  SideMenu,
  Card
} from 'react-native-elements';

// Import components
const StatusBar = require('./StatusBar');
const ActionButton = require('./ActionButton');
const NotificationItem = require('./NotificationItem');
const NotificationModal = require('./NotificationModal');

const styles = require('../styles.js');

const firebaseApp = require('../modules/Firebase').firebaseApp;

class NotificationList extends Component {


  constructor(props) {
    super(props);

    this.menuList = [
      {name: 'Campus', icon: 'school'},
      {name: 'Settings', icon: 'settings'},
      {name: 'Support', icon: 'supervisor-account'},
      {name: 'Help', icon: 'help', onPress: null},
      {name: 'Logout', icon: 'power-settings-new', onPress: this.props.signOut}
    ];

    this.state = {
      isOpen: false,
      selectedNotif: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };

    this.notifsRef = firebaseApp.database().ref().child('notifs');

    // TESTING ONLY add some test data
    // var updates = {};
    // for (var i = 0; i < 15; i++) {
    //   var newNotifKey = firebaseApp.database().ref().child('notifs').push().key;
    //   updates['/notifs/' + newNotifKey] = {title: 'Test Notification Header ' + i, text: 'This is test text for notif '+ i};
    // }
    // firebaseApp.database().ref().update(updates);
  }

  _toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
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
    console.log(this.props.user);
    const MenuComponent = (
      <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
        <List containerStyle={{marginBottom: 20}}>
        {
          this.menuList.map((l, i) => (
            <ListItem
              onPress={l.onPress}
              key={i}
              title={l.name}
              leftIcon={{name: l.icon}}
              hideChevron />
          ))
        }
        </List>
      </View>
    );

    const MenuButton = (
      <Icon
        onPress={this._toggleSideMenu.bind(this)}
        name= 'menu' />
    );

    return (
      <SideMenu
        isOpen = {this.state.isOpen}
        menu = {MenuComponent}>

        <View style = {styles.container}>

          <StatusBar
            title="Notifications"
            menuButton={MenuButton}
            user={this.props.user}/>
          <NotificationModal ref='modal'/>

          <ListView
            dataSource = {this.state.dataSource}
            renderRow = {this._renderNotif.bind(this)}
            enableEmptySections={true}
            style = {styles.listview} />

        </View>
      </SideMenu>

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
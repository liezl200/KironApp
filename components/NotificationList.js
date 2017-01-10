'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableHighlight,
  StyleSheet,
  Text,
  ListView,
  View,
  AlertIOS
  } from 'react-native';

import {
  Button,
  List,
  ListItem,
  Icon,
  SideMenu
} from 'react-native-elements';

// Import components
const StatusBar = require('./StatusBar');
const ActionButton = require('./ActionButton');
const ListNotif = require('./ListNotif');
const menuList = [
  {name: 'Campus', icon: 'school'},
  {name: 'Settings', icon: 'settings'},
  {name: 'Support', icon: 'supervisor-account'},
  {name: 'Help', icon: 'help'},
  {name: 'Logout', icon: 'power-settings-new'}
];

const styles = require('../styles.js');

const firebaseApp = require('../modules/Firebase').firebaseApp;

class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.notifsRef = firebaseApp.database().ref().child('notifs');
    this._toggleSideMenu = this._toggleSideMenu.bind(this);
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
    const MenuComponent = (
      <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
        <List containerStyle={{marginBottom: 20}}>
        {
          menuList.map((l, i) => (
            <ListItem
              onPress={() => console.log('Pressed')}
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
      <Button
        raised
        onPress={this._toggleSideMenu.bind(this)}
        icon={{name: 'dehaze'}}
        title='RAISED WITH ICON' />
    );

    return (
      <SideMenu
        isOpen = {this.state.isOpen}
        menu = {MenuComponent}>

        <View style = {styles.container}>


        <StatusBar
          title="Notifications"
          menuButton = {MenuButton} />

        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this._renderNotif.bind(this)}
          enableEmptySections={true}
          style = {styles.listview} />

        <ActionButton onPress = {this._clearNotifs.bind(this)} title="Clear All" />

      </View>
        </SideMenu>

    )
  }

  _clearNotifs() {

  }

  _renderNotif(notif) {

    const onPress = () => {
      // Pop open notification modal.


    };

    return (
      <ListNotif notif={notif} onPress={onPress} />
    );
  }

}

module.exports = NotificationList;
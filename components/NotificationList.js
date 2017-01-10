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
const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  }];
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
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  toggleSideMenu () {
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
          list.map((l, i) => (
            <ListItem
              roundAvatar
              onPress={() => console.log('Pressed')}
              avatar={l.avatar_url}
              key={i}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))
        }
        </List>
      </View>
    )

    return (
      <SideMenu
          isOpen={this.state.isOpen}
          menu={MenuComponent}>
          <View style={styles.container}>


        <StatusBar title="Notifications" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderNotif.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>

        <ActionButton onPress={this._addNotif.bind(this)} title="Add" />
        <Button
          raised
          onPress={this.toggleSideMenu.bind(this)}
          icon={{name: 'cached'}}
          title='RAISED WITH ICON' />
      </View>
        </SideMenu>

    )
  }

  _addNotif() {

  }

  _renderNotif(notif) {

    const onPress = () => {
      // this.notifsRef.child(notif._key).remove();
      // Pop open notification modal.

    };

    return (
      <ListNotif notif={notif} onPress={onPress} />
    );
  }

}

module.exports = NotificationList;
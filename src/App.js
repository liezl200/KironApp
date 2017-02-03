import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';

import {
  List,
  ListItem,
  Icon,
  SideMenu,
} from 'react-native-elements';

// Import custom components
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const NotificationList = require( './components/NotificationList');

class App extends Component {

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
    };
  }

  _toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
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
      <View>
        <TouchableOpacity
          onPress={this._toggleSideMenu.bind(this)}>
          <Icon
            name= 'menu' />
        </TouchableOpacity>
      </View>
    );

    return (
      <SideMenu
          isOpen = {this.state.isOpen}
          menu = {MenuComponent}>

        <StatusBar
          title="Notifications"
          menuButton={MenuButton}
          user={this.props.user} />
        <NotificationList user={this.props.user}/>

      </SideMenu>
    );
  }
}

module.exports = App;
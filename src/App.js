import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';

import {
  List,
  ListItem,
  Icon,
  SideMenu,
} from 'react-native-elements';

import FCM from 'react-native-fcm';


// Import custom components
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const NotificationList = require( './components/NotificationList');

// Import modules
const firebaseApp = require('./modules/Firebase').firebaseApp;
const usersRef = firebaseApp.database().ref().child('users');

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

  componentDidMount() {
    var appUser = this.props.user;
    FCM.getFCMToken().then(token => {
      console.log(token);
      usersRef.orderByChild('email') // try to look up this user in our firebase db users table
        .equalTo(appUser.email)
        .on('value', function(snapshot) {
            var fbUser = snapshot.val();

            if (fbUser != null) { // user already exists in our firebase db
              // if the current FCM token is not in this user's list, this is the first time we're seeing this device
              snapshot.forEach((foundUser) => {
                var fcmTokens = foundUser.child("fcmTokens").val();
                console.log(fcmTokens);
                if (!fcmTokens.includes(token)) {
                  // associate this new FCM token with this user
                  fcmTokens.push(token);
                  foundUser.ref().update({'fcmTokens' : fcmTokens});
                }
              });
            }
            else { // user does not exist in our firebase db
              // TODO: refactor into ._addNewUser() function
              updates = {}
              var newUserKey = usersRef.push().key; // this.usersRef.push().key;
              updates['/users/' + newUserKey] = {
                email: appUser.email,
                roles: [],
                starred: [],
                read: [],
                groups: [],
                ungroupedNotifs: [],
                fcmTokens: [token] // store fcm token in our server and associate with the logged-in user
              };
              firebaseApp.database().ref().update(updates);
              FCM.subscribeToTopic('all'); // if first login (first time this user was added to users list), auto-subscribe this user to "all" topic and then add them to users
            }
        });
    });

  }
}

module.exports = App;
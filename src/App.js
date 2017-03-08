import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

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
const Spinner = require('./components/Spinner');

const styles = require('./styles');

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
      firebaseUserKey: ''
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
    console.log(this.state);
    if (this.state.firebaseUserKey && this.state.firebaseUserKey !== '') {
      return (
        <SideMenu
            isOpen = {this.state.isOpen}
            menu = {MenuComponent}>

          <StatusBar
            title="Notifications"
            menuButton={MenuButton}
            user={this.props.user} />
          <NotificationList user={this.props.user} firebaseUserKey={this.state.firebaseUserKey}/>
          <View style={styles.bottombar}>
            <TouchableOpacity>
              <Text>Archive</Text>
            </TouchableOpacity>
          </View>
        </SideMenu>
      );
    }
    return (<Spinner size='large'/>);

  }

  componentDidMount() {
    var appUser = this.props.user;
    var appContext = this;
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      console.log(token);
      usersRef.orderByChild('email') // try to look up this user in our firebase db users table
        .equalTo(appUser.email)
        .once('value', function(snapshot) {
            var fbUser = snapshot.val();
            if (fbUser != null) { // user already exists in our firebase db
              // if the current FCM token is not in this user's list, this is the first time we're seeing this device
              snapshot.forEach((foundUser) => { // note there is only one foundUser

                appContext.setState({firebaseUserKey: foundUser.key})
                var fcmTokens = foundUser.child("fcmTokens").val();
                console.log(fcmTokens);
                if (!fcmTokens.includes(token)) {
                  // associate this new FCM token with this user
                  fcmTokens.push(token);
                  var updates = {}
                  updates['/users/' + foundUser.key + '/fcmTokens'] = fcmTokens;
                  firebaseApp.database().ref().update(updates);
                }
              });
            }
            else { // user does not exist in our firebase db
              // TODO: refactor into ._addNewUser() function
              var updates = {}
              var newUserKey = usersRef.push().key; // this.usersRef.push().key;
              var userNotifsSchema = [
              {
                notifKey: 't1',
                starred: false,
                read: false,
                ungroupedNotifs: false
              }
              ];
              updates['/users/' + newUserKey] = {
                email: appUser.email,
                roles: ['t1'],
                notifsInfo: userNotifsSchema,
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
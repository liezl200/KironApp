import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import {
  List,
  Icon,
  SideMenu,
} from 'react-native-elements';
import FCM from 'react-native-fcm';

// Import custom components
import StatusBar from './components/StatusBar';
import NotificationList from './components/NotificationList';
import MenuListItem from './components/MenuListItem';
import Spinner from './components/Spinner';

import KironBrand from './img/kiron.png';
import KironLogo from './img/k.png';

import styles from './styles';

// Import modules
import firebaseApp from './modules/Firebase';

const usersRef = firebaseApp.database().ref().child('users');

const propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      firebaseUserKey: '',
    };
    this.notifsRef = firebaseApp.database().ref().child('notifs');
    this.toggleSideMenu = this.toggleSideMenu.bind(this);

    this.menuList = [
      { name: 'Home', icon: 'home', onPress: this.toggleSideMenu },
      { name: 'Campus', icon: 'school', url: 'https://campus.kiron.ngo' },
      { name: 'Settings', icon: 'settings', url: 'https://campus.kiron.ngo/profile' },
      { name: 'Support', icon: 'supervisor-account', url: 'https://kiron.ladesk.com/' },
      { name: 'Help', icon: 'help', onPress: null, url: 'https://campus.kiron.ngo/contact' },
      { name: 'Logout', icon: 'power-settings-new', onPress: this.props.signOut },
    ];
  }

  componentDidMount() {
    const appUser = this.props.user;
    const appContext = this;
    FCM.requestPermissions();
    FCM.getFCMToken().then((token) => {
      usersRef.orderByChild('email') // try to look up this user in our firebase db users table
      .equalTo(appUser.email)
      .once('value', (snapshot) => {
        const fbUser = snapshot.val();
        if (fbUser != null) { // user already exists in our firebase db
          // if the current FCM token is not in this user's list, then
          // this is the first time we're seeing this device
          snapshot.forEach((foundUser) => { // note there should only be 1 foundUser
            appContext.setState({ firebaseUserKey: foundUser.key });
            const fcmTokens = foundUser.child('fcmTokens').val();
            if (token && !fcmTokens.includes(token)) {
              // associate this new FCM token with this user
              fcmTokens.push(token);
              const updates = {};
              updates[`/users/${foundUser.key}/fcmTokens`] = fcmTokens;
              firebaseApp.database().ref().update(updates);
            }
          });
        } else { // user does not exist in our firebase db
          // TODO: refactor into ._addNewUser() function
          const updates = {};
          const newUserKey = usersRef.push().key; // this.usersRef.push().key;
          const userNotifsSchema = [
            {
              notifKey: 't1',
              starred: false,
              read: false,
              ungroupedNotifs: false,
            },
          ];
          updates[`/users/${newUserKey}`] = {
            email: appUser.email,
            roles: ['t1'],
            notifsInfo: userNotifsSchema,
            // store fcm token in our server and associate with the logged-in user
            fcmTokens: [token],
          };
          firebaseApp.database().ref().update(updates);

          // if first login (first time this user was added to users list), auto-subscribe this
          // user to "all" topic and then add them to users
          FCM.subscribeToTopic('all');
        }
      });
    });
  }

  toggleSideMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(menuState) {
    this.setState({
      isOpen: menuState,
    });
  }

  render() {
    const MenuComponent = (
      <View style={styles.sideMenuStyle}>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            this.menuList.map(l => (
              <MenuListItem
                onPress={l.onPress}
                url={l.url}
                key={l.name}
                title={l.name}
                leftIcon={{ name: l.icon }}
                hideChevron
              />
            ))
          }
        </List>
        <Image source={KironLogo} style={{ width: 100, height: 100, marginLeft: 90 }} />
      </View>
    );

    const MenuButton = (
      <View>
        <TouchableOpacity
          onPress={this.toggleSideMenu}
        >
          <Icon name="menu" />
        </TouchableOpacity>
      </View>
    );
    if (this.state.firebaseUserKey && this.state.firebaseUserKey !== '') {
      return (
        <SideMenu
          isOpen={this.state.isOpen}
          menu={MenuComponent}
          onChange={(isOpen) => { this.updateMenuState(isOpen); }}
        >

          <StatusBar
            title="Notifications"
            menuButton={MenuButton}
            user={this.props.user}
          />
          <NotificationList user={this.props.user} firebaseUserKey={this.state.firebaseUserKey} />
          <View style={styles.bottombar}>
            <Image source={KironBrand} style={{ width: 100, height: 32 }} />
          </View>
        </SideMenu>
      );
    }
    return (<Spinner size="large" />);
  }

}
App.propTypes = propTypes;
module.exports = App;

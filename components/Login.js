/**
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  TouchableOpacity
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

// Import components
const NotificationList = require('./NotificationList');

// Import modules
const firebaseApp = require('../modules/Firebase').firebaseApp;

// Import styles
const styles = require('../styles.js');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.usersRef = firebaseApp.getRef().child('users');
  }

  componentDidMount() {
    this._setupGoogleSignin();
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.loginContainer}>
          <GoogleSigninButton
            style={{width: 212, height: 48}}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Light}
            onPress={this._signIn.bind(this)} />
        </View>
      );
    }

    if (this.state.user) {
      return (
        <View style={styles.container}>
          <NotificationList />
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.user.name}</Text>
          <Text>Your email is: {this.state.user.email}</Text>

          <TouchableOpacity onPress={() => {this._signOut(); }}>
            <View style={{marginTop: 50}}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '969105153506-3cdeb1bv8d9h1tc8kl7hjvto1gotrmr8.apps.googleusercontent.com',
        webClientId: '969105153506-d3g2rslivtlkkvdfi34v2h2a7s54n4ir.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      // TODO(liezl): sync user with server (add to users list if necessary)
      // TODO(liezl): maybe add first login behavior if this is the first time user logs in
      this.setState({user: user});
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }
}

export default Login;
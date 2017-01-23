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
import * as firebase from 'firebase';

import {
  Button
} from 'react-native-elements';

// Import components
const NotificationList = require('./NotificationList');

// Import modules
const firebaseApp = require('../modules/Firebase').firebaseApp;
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// TODO(liezl): Add OAuth options that will allow a forgot your password thru kiron?

// Import styles
const styles = require('../styles.js');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    //this.usersRef = firebaseApp.database().ref().child('users');
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
        <NotificationList signOut={this._signOut.bind(this)}/>
        // <View style={styles.container}>

        //   <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.user.name}</Text>
        //   <Text>Your email is: {this.state.user.email}</Text>

        //   <TouchableOpacity onPress={() => {this._signOut(); }}>
        //     <View style={{marginTop: 50}}>
        //       <Text>Log out</Text>
        //     </View>
        //   </TouchableOpacity>
        // </View>
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
      var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        console.log({'firebase: ': firebaseUser});
        unsubscribe();
        var isUserEqual = function (googleUser, firebaseUser) {
          if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
              if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                  providerData[i].uid === googleUser.id) {
                // We don't need to reauth the Firebase connection.
                return true;
              }
            }
          }
          return false;
        }

        // Check if we are already signed into Firebase with the correct user.
        if (!isUserEqual(user, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
          // Sign in with the credential from the Google user.
          console.log(credential);
          firebase.auth().signInWithCredential(credential).catch(function(error) {
            console.log(error);

            // TODO: Fancier error handling here / implement domain restriction
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
          });
        } else {
          console.log('User already signed-in Firebase.');
        }
      });

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
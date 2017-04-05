/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
} from 'react-native';

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import * as firebase from 'firebase';

// Import components
import App from './App';
import Spinner from './components/Spinner';
import styles from './styles';
import KironLogo from './img/k.png';

const emailDomain = 'kiron.ngo';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: false,
      wrongDomainError: false,
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.setupGoogleSignin();
  }

  async setupGoogleSignin() {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    await GoogleSignin.configure({
      iosClientId: '969105153506-3cdeb1bv8d9h1tc8kl7hjvto1gotrmr8.apps.googleusercontent.com',
      webClientId: '969105153506-d3g2rslivtlkkvdfi34v2h2a7s54n4ir.apps.googleusercontent.com',
      offlineAccess: false,
    });

    const user = await GoogleSignin.currentUserAsync();
    this.setState({ user });
  }

  signIn() {
    this.setState({ loading: true, wrongDomainError: false });
    GoogleSignin.signIn()
    .then((user) => {
      this.setState({ loading: false });

      const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
        unsubscribe();

        const isUserEqual = function isUserEqual(googleUser, fbUser) {
          if (fbUser) {
            const providerData = fbUser.providerData;
            for (let i = 0; i < providerData.length; i += 1) {
              if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.id) {
                // We don't need to reauth the Firebase connection.
                return true;
              }
            }
          }
          return false;
        };

        // If we are not yet signed into Firebase with the correct user.
        if (!isUserEqual(user, firebaseUser)) {
          // Prevent registering emails with other email domains
          if (user.email.endsWith(emailDomain)) {
            // Build Firebase credential with the Google ID token.
            const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
            // Sign in with the credential from the Google user.
            firebase.auth().signInWithCredential(credential);
          }
        }
      });

      if (user && user.email && user.email.endsWith(emailDomain)) {
        this.setState({ user });
      } else {
        this.setState({ wrongDomainError: true });
        this.signOut();
      }
    })
    .catch(() => {
      this.setState({ loading: false });
    })
    .done();
  }

  signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({ user: null });
    })
    .done();
  }

  renderButton() {
    if (this.state.loading) {
      return (<Spinner size="large" />);
    }

    return (
      <GoogleSigninButton
        style={{ width: 212, height: 48 }}
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Light}
        onPress={this.signIn}
      />
    );
  }

  renderSignInError() {
    if (!this.state.loading && ((this.state.user
      && this.state.user.email
      && !this.state.user.email.endsWith(emailDomain))
      || this.state.wrongDomainError)) {
      return (
        <Text>Please login with your {emailDomain} account</Text>
      );
    }
    return null;
  }

  renderApplyLink() {
    if (!this.state.loading) {
      return (
        <Text
          style={{ color: 'white' }}
          onPress={() => Linking.openURL('https://apply.kiron.ngo/register')}
        >
            or Apply
        </Text>
      );
    }
    return null;
  }

  renderForgotPasswordLink() {
    if (!this.state.loading) {
      return (
        <Text
          style={{ color: 'white', paddingTop: 20 }}
          onPress={() => Linking.openURL('https://campus.kiron.ngo/reset')}
        >
            Forgot your password?
        </Text>
      );
    }
    return null;
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.loginContainer}>
          <Image source={KironLogo} style={{ width: 200, height: 200 }} />
          {this.renderSignInError()}
          {this.renderButton()}
          {this.renderApplyLink()}
          {this.renderForgotPasswordLink()}
        </View>
      );
    }
    return (
      <App signOut={this.signOut} user={this.state.user} />
    );
  }
}

module.exports = Login;

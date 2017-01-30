import * as firebase from 'firebase';

// Initialize Firebase
// todo(liezl): separate actual config values to use hidden file
const firebaseConfig = {
  apiKey: "AIzaSyCt67plNCX9rPp4VKp0DPVnZR9hHBY8U4Y",
  authDomain: "kirontestapp.firebaseapp.com",
  databaseURL: "https://kirontestapp.firebaseio.com",
  storageBucket: "kirontestapp.appspot.com",
  messagingSenderId: "969105153506"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports.firebaseApp = firebaseApp;
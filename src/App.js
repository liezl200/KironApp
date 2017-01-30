import React, {Component} from 'react';
import {View, Text} from 'react-native';

const Login = require( './components/Login');

// const Login = require('./components/Login');

class App extends Component {
	render() {
		return (
			<Login />
		);
	}
}

export default App;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {DrawerNavigator} from 'react-navigation';
import Home from './android/app/components/Home';
import Dashboard from './android/app/components/Dashboard';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ImageBackground
} from 'react-native';


export default class App extends Component {

  constructor() {
    super()
    this.state = {}

  }
  render() {
    return (
        <AppStack/>
    );
  }
}

const AppStack = DrawerNavigator({
  home: {screen: Home },
  dashboard : {screen: Dashboard},
})


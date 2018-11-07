import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View , TouchableOpacity,Dimensions,ScrollView,Button, Icon, Image} from 'react-native';

import {Action} from 'react-native-router-flux';
import {DrawerNavigator} from 'react-navigation';
import ImageSlider from 'react-native-image-slider';


export default class navigate extends Component{
  render() {
    return (
      <ImageSlider images={[
        '../images/background.jpg',
        '../images/dish4.jpg',
        '../images/dish3.jpg',
        '../images/dish5.jpg'
      ]}/>
    );
  }
}



AppRegistry.registerComponent('navigate', () => navigate);
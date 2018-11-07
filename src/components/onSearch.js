import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View , ImageBackground, TouchableOpacity,Dimensions,ScrollView,Button, Icon, Image} from 'react-native';

import {Actions} from 'react-native-router-flux';
import { Rating , ListItem } from 'react-native-elements';

import TouchableScale from 'react-native-touchable-scale' 
import LinearGradient from 'react-native-linear-gradient' 

export default class onSearch extends Component{
    render() {
        return (
        <ScrollView>
       <ListItem
    component={TouchableScale}

    friction={90} //
    tension={100} // These props are passed to the parent component (here TouchableScale)
    activeScale={0.95} //

    linearGradientProps={{
      colors: ['white', 'blue'],
      start: [1, 0],
      end: [0.2, 0],
    }}
    ViewComponent={LinearGradient} 
    title="Chris Jackson"
    titleStyle={{ color: 'black', fontWeight: 'bold' }}
    subtitleStyle={{ color: 'black' }}
    subtitle="Vice Chairman"
    chevronColor="white"
    chevron
  />
    </ScrollView>
  
  );
}
}

AppRegistry.registerComponent('onSearch', () => onSearch);
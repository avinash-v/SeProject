import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View , TouchableOpacity,Dimensions,ScrollView,Button, Icon, Image} from 'react-native';

import {Router, Stack, Scene} from 'react-native-router-flux';

import DishPage from './src/components/DishPage';
import CooksPage from './src/components/CooksPage';
import OrderSummary from './src/components/OrderSummary';
import ReviewPage from './src/components/ReviewPage';
import DeliverTracker from './src/components/DeliverTracker';
import  DishesList from './src/components/DishesList';
import SearchPage from './src/components/SearchPage';

export default class App extends Component{
  render() {
    return (
      <Router>
        <Stack  key="root" hideNavBar={true}>
        <Scene key="SearchPage" component={SearchPage} title="SearchPage" initial={true}/>
        <Scene key="DishesList" component={DishesList} title="DishesList" />
          <Scene key="DishPage" component={DishPage} title="DishPage" />
          <Scene key="CooksPage" component={CooksPage} title="CooksPage" />
          <Scene key="OrderSummary" component={OrderSummary} title="OrderSummary"  />
          <Scene key="ReviewPage" component={ReviewPage} title="ReviewPage"  />
          <Scene key="DeliverTracker" component={DeliverTracker} title="DeliverTracker"  />
          </Stack>
      </Router>
    );
  }
}

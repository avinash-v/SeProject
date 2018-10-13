/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {DrawerNavigator} from 'react-navigation';


import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ImageBackground
} from 'react-native';


export default class Home extends Component {

  constructor() {
    super()
    this.state = {}

  }
  render() {
    return (
        <ImageBackground
          source = {require('./background.jpg')}
          style = {styles.container}
        >
            
             <View style={styles.overlayContainer}>
             <Image source={require('./1.jpg')} style = {styles.logo}/>
               <Text style={styles.open_text}>Delivery Guy Name:{"\n\n\n"}</Text>
                 <Text style={styles.open_text}>Rating:{"\n\n\n"}</Text>
                 <Text style={styles.open_text}>Total no.of Deliveries:{"\n\n\n"}</Text>
                 <Text style={styles.open_text}>Deliveries Done today:{"\n\n\n"}</Text>
                 <Text style={styles.open_text}>Toatal Amount recorded:{"\n\n\n"}</Text>
                 <Text style={styles.open_text}>Amount recorded today:{"\n\n\n"}</Text>
                 <Button style = {styles.footer}
                         title="LogOut"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                  />
             </View>
             </ImageBackground>
            
            
            
              
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'

  },

  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(119,136,153,.7)'
  },
  logo:{
    width: 50,
    height: 50,
    left: 150

  },

  open_text:
  {
    fontSize: 15,
    color: '#ffffe6',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-thin'
  },
  footer: {
    flex: 1,
    flexDirection : 'column',
    justifyContent: 'space-between'

  },
 

});

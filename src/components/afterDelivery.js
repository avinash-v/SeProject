import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity, ImageBackground} from 'react-native';
//import Component1 from './components/Component1';

export default class App extends Component{

  _homePage() {
    alert("Direct to home page")
  }
  render() {
    return (
      <ImageBackground source = {require("C:/Users/AVINASH/sepro_v2/images/background.jpg")} style = {{width:'100%', height:'100%'}}>
        <View style={styles.container}>
         <Text style = {styles.hello}>
          Header
         </Text>
         <View style={styles.middle}>
          <Text style={{fontSize:30}}>
            Delivery Id: DEL12282
          </Text>
          <Text style={{fontSize:30}}>
            Amount recieved: Rs.'123'
          </Text>
         </View>
         <Button
           title="           Back to home        "
           onPress={this._homePage}
           color="#841584"
         />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(119,136,153,0.7)',
    color:'#fff'
  },
  hello: {
    fontSize: 30,
    height:100
  },
  middle:{
    height:600,
  }
})

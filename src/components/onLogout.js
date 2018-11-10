import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity, ImageBackground} from 'react-native';
//import Component1 from './components/Component1';

export default class App extends Component{

  _paytm() {
    alert("open paytm")
  }
  render() {
    return (
      <ImageBackground source = {require("C:/Users/AVINASH/kitchenLY/src/images/background.jpg")} style = {{width:'100%', height:'100%'}}>
        <View style={styles.container}>
         <Text style = {styles.hello}>
          Header
         </Text>
         <View style={styles.middle}>
          <Text style={{fontSize:30}}>
            Please transfer the money.
          </Text>
          <Text style={{fontSize:30}}>
            Amount to be transferred: Rs.'1423'
          </Text>
         </View>
         <Button
           title="          paytm        "
           onPress={this._paytm}
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

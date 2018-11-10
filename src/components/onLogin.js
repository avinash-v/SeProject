import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity, ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      userName: 'avinash'
    }
  }

  _callCook() {
    alert("Calling cook")
  }
  _seeCook() {
    alert("Go to Cook's page")
    Actions.cookDetailsPage();
  }
  _openMaps(){
    alert("Open google maps with src and dest")
  }
  render() {
    return (
      <ImageBackground source = {require("C:/Users/AVINASH/kitchenLY/src/images/background.jpg")} style = {{width:'100%', height:'100%'}}>

        <View style={styles.container}>
         <Text style = {styles.hello}>
          KITCHENLY
         </Text>
         <TouchableOpacity style = {{height:200}} onPress={this._seeCook}>
          <Image
           style = {{height:100}}
           source={require("C:/Users/AVINASH/kitchenLY/src/images/notifications.png")}
          />
         </TouchableOpacity>
         <Text>
         Deliveryguy Name
         Ratings
         Total no of deliveries
         deliveries today
         total Amount
         amount today
         </Text>

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
  cookPhoto:{
    marginLeft:10,
    width:120,
    height:150
  },
  allButtons:{
        //color:"#4169e1",
        height:90,
        width:360,
        backgroundColor:'#fff',
        borderRadius:100
    },
  callButton:{
    width:180,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#859a9b',
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  }
})

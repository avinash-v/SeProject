import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity, ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { cookFunctions } from 'C:/Users/AVINASH/kitchenLY/src/functions/cookDetailsPage.js'
export default class App extends Component{
/*
  constructor(props){
    super(props);
    this.checkNoti = this.checkNoti.bind(this)
    this.state = {
      userName: this.props.userName,
      userData: "",
      location: 2
    }
  }

  _callCook() {
    alert("Calling cook")
  }
  _seeCustomer() {
    alert("Go to Customer's page")
    clearInterval(interval)
    Actions.customerDetails();
  }
  _openMaps(){
    alert("Open google maps with src and dest")
  }

  checkNoti(details) {
    fetch("http://192.168.1.3:3000/delivery/checkDelivery", {
       method: 'POST',
       headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
       body: JSON.stringify(details),

       details should have
       cookName: '',
       cooksPhoto: '',
       cookName: '',
       cookPhone: '',
       cookAddress: '',
       currentLocation: '',
       destLocation: '',
       totalItemCount: '',

     }).then(res => res.json())
       .then((res)=>{
         userName = res.userName
         cookName = res.cookName
         cooksPhoto = res.cooksPhoto
         cookPhone = res.cookPhone,
         cookAddress = res.cookAddress,
         currentLocation = res.currentLocation,
         destLocation = res.destLocation,
         totalItemCount = res.totalItemCount
         this.setState({location:res.location})
         //alert(res.location)
       });
   }


  _notifications(){
    var data = {deliveryId:this.props.userName}
    interval = setInterval(this.checkNoti,5000,data)
  }

*/
  render() {
    return(
      <ImageBackground source = {require("C:/Users/AVINASH/kitchenLY/src/images/background.jpg")} style = {{width:'100%', height:'100%'}} >
        <View style={styles.container}>
         <Text style = {styles.hello}>
          Header {this.state.location}
         </Text>

        </View>
      </ImageBackground>
    )
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

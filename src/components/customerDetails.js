import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity, ImageBackground} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class App extends Component{

  constructor(props){
    super(props);
    this.checkNoti = this.checkNoti.bind(this)
    this.state = {
      userName: this.props.userName,
      userData: "",
      location: 2
    }
  }

  _callCust() {
    alert("Calling cust")
  }
  _delivered() {
    alert("After Delivery")
    Actions.afterDelivery();
  }
  _openMaps(){
    alert("Open google maps with src and dest")
  }

  checkNoti(details) {
    fetch("http://192.168.1.3:3000/delivery/checkDelivery", {
       method: 'POST',
       headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
       body: JSON.stringify(details),
       /*
       details should have
       cookName: '',
       cooksPhoto: '',
       cookName: '',
       cookPhone: '',
       cookAddress: '',
       currentLocation: '',
       destLocation: '',
       totalItemCount: '',
       */
     }).then(res => res.json())
       .then((res)=>{
         /*userName = res.userName
         custName = res.custName
         custsPhoto = res.custsPhoto
         custPhone = res.custPhone,
         custAddress = res.custAddress,
         currentLocation = res.currentLocation,
         destLocation = res.destLocation,
         totalItemCount = res.totalItemCount*/
         this.setState({location:res.location})
         alert(res.location)
       });
   }


  _load(){
    var data = {deliveryId:this.props.userName}
    interval = setInterval(this.checkNoti,5000,data)
  }


  render() {
    return (
      <View>
        <ImageBackground source = {require("C:/Users/AVINASH/kitchenLY/src/images/background.jpg")} style = {{width:'100%', height:'100%'}} onLoad={this._load()}>
          <View style={styles.container}>
           <Text style = {styles.hello}>
            Header
           </Text>
           <View style = {{flexDirection:'row',padding:10,backgroundColor:'#fff',marginLeft:15, marginRight:15}}>
             <Image
              style = {styles.custPhoto}
              source = {require('C:/Users/AVINASH/kitchenLY/src/images/custPhoto.jpg')}
             />
             <View style = {{flexDirection:'column',width:250, marginLeft:10, marginRight:10}}>
               <Text style = {{height:40}}>
                Customer Name
               </Text>
               <Text style = {{height:80}}>
                Customer Address
               </Text>
               <TouchableOpacity style = {styles.callButton} onPress={this._callCust}>
                <Image
                style = {styles.callButton}
                source={require("C:/Users/AVINASH/kitchenLY/src/images/callImage.jpg")}
                />
               </TouchableOpacity>
              </View>
            </View>
            <View style = {{height:200,margin:10, borderColor:'blue',borderWidth:1, alignItems:'center'}}>
              <TouchableOpacity style = {{height:200}} onPress={this._openMaps}>
               <Image
                style = {{height:200}}
                source={require("C:/Users/AVINASH/kitchenLY/src/images/maps.jpg")}
               />
              </TouchableOpacity>
            </View>
            <View style = {{alignItems:'center',height:150,borderColor:'blue',borderWidth:1,borderRadius:10}}>
              <Button
                title="            Delivered         "
                onPress={this._delivered}
                color="#841584"
              />
            </View>
          </View>
      </ImageBackground>
      </View>
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
  custPhoto:{
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

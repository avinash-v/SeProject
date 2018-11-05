import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity, ImageBackground} from 'react-native';
//import Component1 from './components/Component1';

export default class App extends Component{

  _callCook() {
    alert("Calling cook")
  }
  _seeCustomer() {
    alert("Go to Customer's page")
  }
  _openMaps(){
    alert("Open google maps with src and dest")
  }
  render() {
    return (
      <ImageBackground source = {require("C:/Users/AVINASH/sepro_v2/images/background.jpg")} style = {{width:'100%', height:'100%'}}>
        <View style={styles.container}>
         <Text style = {styles.hello}>
          Header
         </Text>
         <View style = {{flexDirection:'row',padding:10,backgroundColor:'#fff',marginLeft:15, marginRight:15}}>
           <Image
            style = {styles.cookPhoto}
            source = {require('C:/Users/AVINASH/sepro_v2/images/cookPhoto.jpg')}
           />
           <View style = {{flexDirection:'column',width:250, marginLeft:10, marginRight:10}}>
             <Text style = {{height:40}}>
              Cook Name
             </Text>
             <Text style = {{height:80}}>
              Cook Address
             </Text>
             <TouchableOpacity style = {styles.callButton} onPress={this._callCook}>
              <Image
              style = {styles.callButton}
              source={require("C:/Users/AVINASH/sepro_v2/images/callImage.jpg")}
              />
             </TouchableOpacity>
            </View>
          </View>
          <View style = {{height:200,margin:10, borderColor:'blue',borderWidth:1, alignItems:'center'}}>
            <TouchableOpacity style = {{height:200}} onPress={this._openMaps}>
             <Image
              style = {{height:200}}
              source={require("C:/Users/AVINASH/sepro_v2/images/maps.jpg")}
             />
            </TouchableOpacity>
          </View>
          <View style = {{alignItems:'center',height:150,borderColor:'blue',borderWidth:1,borderRadius:10}}>
            <Text style = {{fontSize:30,padding:5,width:360,marginLeft:60,color:'#fff'}}>
              Total no. of items: 10
            </Text>
            <Button
              title="            See Customer         "
              onPress={this._seeCustomer}
              color="#841584"
            />
            <Text style = {{fontSize:30,padding:5,width:360,marginLeft:60,color:'#fff'}}>
              CountDown: 00:29:33
            </Text>
          </View>
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

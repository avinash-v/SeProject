import React, {Component} from 'react';
import {DrawerNavigator} from 'react-navigation';
import {Platform, StyleSheet, Text, View, Image,Alert, Button, TouchableOpacity, ImageBackground, Switch, ScrollView, Animated,Easing, Linking} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Actions } from 'react-native-router-flux';
import { Slider, Avatar, ListItem, Rating } from 'react-native-elements'
import call from 'react-native-phone-call'
import android.content.Intent;
//import SendIntentAndroid from 'react-native-send-intent'
//react-native link react-native-send-intent


export default class App extends Component{

  constructor(props){
    super(props);
    this.springValue = new Animated.Value(0.3)
    this.checkNoti = this.checkNoti.bind(this)
    this.state = {
      userName: this.props.userName,
      dl_no:'AFSH178291',
      amt_today:1324
    }
  }

  componentDidMount(){
    this._load()
  }

  _load(){
    var data = {deliveryId:this.props.userName}
    interval = setInterval(this.checkNoti,10000,data)
  }

  checkNoti(details) {
    fetch("http://192.168.31.151:3000/getDeliveryDetails", {
       method: 'POST',
       headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
       body: JSON.stringify(details)
     }).then((res) => res.json())
       .then((res)=>{
         this.setState({userName: this.props.userName})
         this.setState({dl_no:this.state.dl_no})
         this.setState({amt_today:this.state.amt_today})
       });
   }

  /* openTez(){
       const url = 'com.google.android.apps.nbu.paisa.user://';
       Platform.OS === 'android' ?

       Linking.canOpenURL(url).then(supported => {
         if (!supported) {
           Alert.alert('Sorry, The app is not installed in your device! Press OK to install it now!',
                 [{
                     text: 'OK',
                     onPress: () =>Linking.openURL('https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user&hl=en_IN')
                  },
                 {text: 'Cancel'},
                 ],
                 {
                   cancelable: false
                 }
          );
         }
         else {
             return Linking.openURL(url);
             alert("payment")
         }
       }).catch(err => console.error('An error occurred', err))
               :
              Linking.openURL('https://itunes.apple.com/in/app/google-pay-for-india-tez/id1193357041?mt=8')
   }*/

   openTez = () => {

     var SendIntentAndroid = require('react-native-send-intent');

   SendIntentAndroid.isAppInstalled('com.google.android.apps.nbu.paisa.user:').then((isInstalled) => {
       if (isInstalled) {
           SendIntentAndroid.openApp('com.google.android.apps.nbu.paisa.user:').then((wasOpened) => {
               if (wasOpened) {
                   console.log("App opened");
               }
               else {
                   console.log("Error opening app or it was not opened");
               }
           });
       }
   });}


   _menu = null;

   setMenuRef = ref => {
     this._menu = ref;
   };

   login = () => {
     this._menu.hide();
     Actions.onLogin();
   };

   cook = () => {
     this._menu.hide();
     Actions.cookDetailsPage();
   };

   cust = () => {
     this._menu.hide();
     Actions.customerDetails();
   };

   logout = () => {
     this._menu.hide();
     Actions.onLogout();
   };

   showMenu = () => {
     this._menu.show();
   };


  render() {
    return(
      <ScrollView style={styles.container}>
      {/* ################################################## MENU  ###########################################################  */}
      <View style = {{flexDirection: 'row'}}>
      <Menu
        ref={this.setMenuRef}
        button={<TouchableOpacity onPress={this.showMenu} style = {{top:0,height:70,width:70}}>
         <Image
          style = {{height:70, width:70}}
          source={require("C:/Users/AVINASH/kitchenLY/src/images/menuImage.png")}
         />
         </TouchableOpacity>
       }
      >
        <MenuItem onPress={this.login} disabled>Home</MenuItem>
        <MenuDivider />
        <MenuItem onPress={this.cook}>Cook details</MenuItem>
        <MenuDivider />
        <MenuItem onPress={this.cust}>Customer details</MenuItem>
        <MenuDivider />
        <MenuItem onPress={this.logout}>Logout</MenuItem>
      </Menu>
      <Image source={require("C:/Users/AVINASH/kitchenLY/src/images/oOta.png")} style = {{ left:100,top:0,height:70,width:70}}/>
       <TouchableOpacity onPress={this._seeCook} style = {{ left:200,top:0,height:70,width:70}}>
        <Image
         style = {{height:70, width:70}}
         source={require("C:/Users/AVINASH/kitchenLY/src/images/notifications.png")}
        />
       </TouchableOpacity>
       </View>
       {/* ##################################################  MENU  ###########################################################  */}
       {/* ################################################## ON DUTY  ###########################################################  */}
       <View style={{height:'10%',alignItems:'center'}}>
        <Text style = {{color:"#FFD700", fontSize:20,marginTop:40,alignItems:'center'}} >Order Details </Text>
       </View>
       {/* ##################################################  ON DUTY  ###########################################################  */}
       {/* ##################################################  Delivery guy details  ###########################################################  */}
       <View style = {{flexDirection: 'column',padding:20,height:'50%'}}>
         <View style={{width:'80%',height:'30%',padding:15}}>
           <View style = {{flex:1}}><Text style={styles.open_text}> Name:  {this.state.name_dg}{"\n\n\n"}</Text></View>
         </View>
         <View style={{width:'80%',height:'30%',padding:15}}>
           <View style = {{flex:1}}><Text style={styles.open_text}>Driving licence: {this.state.dl_no}{"\n\n\n"}</Text></View>
         </View>
         <View style={{width:'80%',height:'30%',padding:15}}>
           <View style = {{flex:1}}><Text style={styles.open_text}>Amount to be transferred: {this.state.amt_today}{"\n\n\n"}</Text></View>
         </View>
       </View>
       {/* ##################################################  Delivery guy details  ###########################################################  */}
        <TouchableOpacity style = {styles.button}
         onPress={this.openTez}>
         <Text style = {styles.buttonText} >Pay using Google Pay</Text>
         </TouchableOpacity>


      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#455a64',
    color:'#fff'
  },
  signupButton: {
  color: '#ffffff',
  fontSize: 25,
  left: 150,
  fontWeight: '500'
},
overlayContainer: {
  flex: 1,
  backgroundColor: "rgba(255, 255, 255, 0.3)",
},
logo:{
  width: 50,
  height: 50,
  left: 130

},

open_text:
{
  fontSize: 15,
  color: '#ffffe6',
  fontFamily: 'Hiragino Sans'
},
footer: {
  justifyContent: 'space-between',
  backgroundColor: '#1c313a'

},
button: {
                width: 300,
                borderRadius: 25,
                marginVertical: 10,
                marginLeft:50,
                paddingVertical: 12,
                backgroundColor: "#1c313a"
        },
callbutton: {
                        width: 100,
                        borderRadius: 25,
                        marginVertical: 10,
                        marginLeft:50,
                        paddingVertical: 12,
                        backgroundColor: "#1c313a"
                },
buttonText: {
                fontSize: 16,
                fontWeight: '500',
                color: '#ffffff',
                textAlign: 'center',
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
  },
  logo:{
    width: 70,
    height: 70,
    left: 150

  }
})

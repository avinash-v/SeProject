import React, {Component} from 'react';
import {DrawerNavigator} from 'react-navigation';
import {Platform, StyleSheet, Text, View, Image,Alert, Button, TouchableOpacity, ImageBackground, Switch, ScrollView} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Actions } from 'react-native-router-flux';
import { Slider, Avatar, ListItem, Rating } from 'react-native-elements'
import call from 'react-native-phone-call'
import getDirections from 'react-native-google-maps-directions'

export default class App extends Component{

  constructor(props){
    super(props);
    this.checkNoti = this.checkNoti.bind(this)
    this._callCust = this._callCust.bind(this)
    this._openMaps = this._openMaps.bind(this)
    this.state = {
      custName: 'Chinmayee',
      custPhoto: '',
      phone_no: '8951637833',
      addr_details: 'PES University',
      totalItemCount: 3,
      cooksLatitude:12.935320,
      cooksLongitude:77.532879
    }
  }

  componentDidMount(){
    this._load()
  }

  _load(){
    var data = {cookId:this.props.userName}
    interval = setInterval(this.checkNoti,5000,data)
  }

  checkNoti(details) {
    //fetch("http://ec2-54-89-140-181.compute-1.amazonaws.com:3000/cook/getCookDetails", {
    fetch("https:192.168.31.151:3000/cook/getCustomerDetails", {
       method: 'POST',
       headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
       body: JSON.stringify(details)
     }).then((res) => res.json())
       .then((res)=>{
         this.setState({custName:res.custName})
         this.setState({custPhoto:res.custPhoto})
         this.setState({phone_no:res.phone_no})
         this.setState({addr_details:res.addr_details})
         this.setState({totalItemCount:res.totalItemCount})
       });
   }

  _callCust() {
    const args = {
      number: this.state.phone_no, // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    }

    call(args).catch(console.error)
  }

   _openMaps(){
     const data = {
       destination: {
         latitude: this.state.cooksLatitude,
         longitude: this.state.cooksLongitude
       },
       params: [
         {
           key: "travelmode",
           value: "driving"        // may be "walking", "bicycling" or "transit" as well
         },
         {
           key: "dir_action",
           value: "navigate"       // this instantly initializes navigation using the given travel mode
         }
       ]
     }

     getDirections(data)
   }

_afterDelivery(){
  alert("Delivery complete")
  Actions.afterDelivery();
}

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
      {/* ##################################################  onLoad={this._load()} MENU  ###########################################################  */}
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
       <View style={{height:'10%',alignItems:'center'}}>
        <Text style = {{color:"#FFD700", fontSize:20,marginTop:40,alignItems:'center'}} >Total no. of Items = {this.state.totalItemCount}</Text>
       </View>
       {/* ################################################## Customer details  ###########################################################  */}
       <View style = {{flexDirection: 'row',padding:20,marginVertical:20,height:'20%'}}>
         <Avatar
          large
          rounded
          source={require("C:/Users/AVINASH/kitchenLY/src/images/deliveryGuy.png")}
          onPress={this._seeProfile}
          activeOpacity={0.7}
          />
          <View style = {{flexDirection:'column',left:60,padding:20,flex:1,width:'50%'}} onPress={this._seeProfile}>
            <Text style = {{color:"#FFD700"}}> {this.state.custName} </Text>
            <TouchableOpacity style = {styles.callbutton} onPress={this._callCook}>
              <Text style = {styles.buttonText}> Call Customer</Text>
            </TouchableOpacity>
          </View>
       </View>
       {/* ##################################################  Delivery guy details  ###########################################################  */}
       {/* ##################################################  Delivery guy details  ###########################################################  */}
       <View style = {{height:200,margin:10, borderColor:'blue',borderWidth:1, alignItems:'center'}}>
         <TouchableOpacity style = {{height:200}} onPress={this._openMaps}>
          <Image
           style = {{height:200}}
           source={require("C:/Users/AVINASH/kitchenLY/src/images/maps.jpg")}
          />
         </TouchableOpacity>
       </View>
        {/* ##################################################  Delivery guy details  ###########################################################  */}
               <TouchableOpacity style = {styles.button} onPress={this._afterDelivery}>
                <Text style = {styles.buttonText} > Delivered </Text>
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
                        width: 150,
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

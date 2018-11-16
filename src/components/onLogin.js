import React, {Component} from 'react';
import {DrawerNavigator} from 'react-navigation';
import {Platform, StyleSheet, Text, View, Image,Alert, Button, TouchableOpacity, ImageBackground, Switch, ScrollView} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Actions } from 'react-native-router-flux';
import { Slider, Avatar, ListItem, Rating } from 'react-native-elements'

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      dg_id: this.props.userName,
      name_dg: 'del name',
      phone_no:8951637833,
      onDuty:false,
      nod:0,
      dt:0,
      total_amt:0,
      amt_today:0,
      notifications:0,
      rating_dg:3.6
    }
  }

/*  componentDidMount(){
    this._load()
  }
*/
  _load(){
    var data = {userName:this.props.userName}
    interval = setInterval(this.checkOnDuty,10000,data)
  }

  checkOnDuty(details) {
    fetch("https:192.168.31.151:3000//delivery/getDeliveryDetails", {
       method: 'POST',
       headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
       body: JSON.stringify(details)
     }).then((res) => res.json())
       .then((res)=>{
         this.setState({name_dg: res.name_dg})
         this.setState({phone_no:res.phone_no})
         this.setState({onDuty:res.onDuty})
         this.setState({nod:res.nod})
         this.setState({dt:res.dt})
         this.setState({total_amt:res.total_amt})
         this.setState({amt_today:res.amt_today})
         this.setState({notifications:res.notifications})
         this.setState({rating_dg:res.rating_dg})
       });
   }

  _seeCook() {
    alert("going to cooks page")
    Actions.cookDetailsPage();
  }

  _seeProfile(){
    alert("going to profile page")
    Actions.profilePage();
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
    return (
        <ScrollView style={styles.container} >
        {/* ##################################################  MENU  ###########################################################  */}
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
         <ImageBackground
            source={require("C:/Users/AVINASH/kitchenLY/src/images/notifications.png")}
            onPress={this._seeCook}
            style={{
              height: 70,
              width: 90,
              position: 'relative', // because it's parent
              top: 0,
              left: 200
            }}
          >

            <Text
              onPress = {this._seeCook}
              style={{
                fontSize:40,
                fontWeight: 'bold',
                color: 'white',
                position: 'absolute', // child
                bottom: 10, // position where you want
                left: 0
              }}
            >
             {this.state.notifications}
            </Text>
          </ImageBackground>

         </View>
         {/* ##################################################  MENU  ###########################################################  */}
         {/* ################################################## ON DUTY  ###########################################################  */}
         <View style = {{flexDirection: 'row', padding:25, alignItems:'center'}}>
           <Text style = {{fontSize:25, left:100}}>
            On Duty:
           </Text>
           <Switch
              onValueChange={ (value) => this.setState({ onDuty: value })}
              value={ this.state.onDuty }
              style = {{ left:130}}
              trackCollor = {{flase:'red',true:'green'}}
            />
          </View>
         {/* ##################################################  ON DUTY  ###########################################################  */}
         {/* ##################################################  Delivery guy details  ###########################################################  */}
         <Text style = {{left:150,color:"#FFD700",fontSize:15,paddingVertical:5}}> {this.state.name_dg} </Text>
         <Text style = {{left:150,color:"#FFD700",fontSize:15,paddingVertical:10}}> {this.state.phone_no} </Text>
         <View style = {{flexDirection: 'row',height:'20%'}} >
            <View style = {{marginLeft:30,marginVertical:20,ignItems:'center'}}>
             <Avatar
              large
              rounded
              source={require("C:/Users/AVINASH/kitchenLY/src/images/deliveryGuy.png")}
              onPress={this._seeProfile}
              activeOpacity={0.7}
              />
            </View>
            <View style = {{flexDirection:'column',left:60,flex:1}}>
              <Rating
                showRating
                type="star"
                fractions={1}
                ratingTextColor="#FFD700"
                startingValue={this.state.rating_dg}
                showReadOnly={false}
                imageSize={25}
                style={{backgroundColor:'#455a64',padding:20}}
              />
            </View>
         </View>
         {/* ##################################################  Delivery guy details  ###########################################################  */}
         {/* ##################################################  Delivery guy details  ###########################################################  */}
          <View style={{flexDirection:'row',padding:25,flexWrap:'wrap',height:'30%'}}>
            <View style={{width:'50%',height:'50%',padding:15}}>
              <View style = {{flex:1}}><Text style={styles.open_text}>Total no.of Deliveries:{"\n"}{this.state.nod}{"\n"}</Text></View>
            </View>
            <View style={{width:'50%',height:'50%',padding:15}}>
              <View style = {{flex:1}}><Text style={styles.open_text}>Deliveries today:{"\n"}{this.state.dt}{"\n"}</Text></View>
            </View>
            <View style={{width:'50%',height:'50%',padding:15}}>
              <View style = {{flex:1}}><Text style={styles.open_text}>Toatal Amount:{"\n"}{this.state.total_amt}{"\n"}</Text></View>
            </View>
            <View style={{width:'50%',height:'50%',padding:15}}>
              <View style = {{flex:1}}><Text style={styles.open_text}>Amount today:{"\n"}{this.state.amt_today}{"\n"}</Text></View>
            </View>
          </View>
          {/* ##################################################  Delivery guy details  ###########################################################  */}
                 <TouchableOpacity style = {styles.button}
                  onPress={() => {
                    afterLogout  = () => {
                      Actions.onLogout();
                    };


                    Alert.alert(
                      'LogOut?',
                      'You will be logged out!',
                      [
                        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => Actions.onLogout()}
                      ],
                      { cancelable: false }
                    );
                  }} >

                  <Text style = {styles.buttonText} > Logout </Text>
                  </TouchableOpacity>
        </ScrollView>
    );
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

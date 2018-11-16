import {AppRegistry,Platform, StyleSheet, Text, View , ImageBackground, TouchableOpacity,Dimensions,ScrollView,Button, Icon, Image, Switch, Slider} from 'react-native';
import React, {Component} from 'react';
import {DrawerNavigator} from 'react-navigation';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Actions } from 'react-native-router-flux';
import { Avatar, ListItem, Rating } from 'react-native-elements'


import {serverConf,} from "../Globals";



export default class CooksPage extends Component{
    constructor(props){
        super(props)
        this.state = {
          cooksName:"COOK'S NAME",
          addr_details: "Anyone, along Anyone, along  along with some of those by bishop ",
          ratingVal: 3,
          reviews_list: [
            {
              review: "Amazing",
            }
          ],
          presentItems: [
            {
              dish_name: 'Masala Dosa',
              price: '100',
              cuisine: 'SOuth Indian',
              count:0
            },
            {
              dish_name: 'Plain Dosa',
              price: '80',
              cuisine: 'SOuth Indian',
              count:0
            }
          ],
          updatedItems:[
          ],
          no_ol:0,
        }
      }

    updateCount(l,sign){
      var nowc = -1;
      for (var i=0; i < this.state.no_ol; i++) {
        if(l.dish_name == this.state.updatedItems[i].dish_name){
          nowc = 0;
          if(sign == '+'){
            this.state.updatedItems[i].count = this.state.updatedItems[i].count + 1;
          }
          if(sign == '-'){
            this.state.updatedItems[i].count = this.state.updatedItems[i].count - 1;
          }
          l.count = this.state.updatedItems[i].count;
          break;
        }
    }
    if(nowc ==-1){
      this.state.updatedItems[this.state.no_ol] = {dish_name:l.dish_name , dish_price:l.price, count:1};
      this.state.no_ol = this.state.no_ol+1;
      l.count = 1;
     }

     alert(this.state.no_ol);
     this.setState({updatedItems:this.state.updatedItems});
    }

    checkNoti(details) {
      fetch("http://192.168.43.17:3000/delivery/checkDelivery", {
         method: 'POST',
         headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
         body: JSON.stringify(details)
       }).then((res) => res.json())
         .then((res)=>{
           this.setState({presentItems:res.presentItems});
           this.setState({location:res.location});
         });
     }


    _load(){
      var data = {deliveryId:this.props.userName}
      interval = setInterval(this.checkNoti,5000,data)
      alert("Should query from the db and get all content")
    }
    componentDidMount(){
      this._load()
    }


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
       <TouchableOpacity onPress={this._seeCook} style = {{ left:200,top:0,height:70,width:70}}>
        <Image
         style = {{height:70, width:70}}
         source={require("C:/Users/AVINASH/kitchenLY/src/images/notifications.png")}
        />
       </TouchableOpacity>
       </View>
       {/* ##################################################  MENU  ###########################################################  */}
       {/* ################################################## ON DUTY  ###########################################################  */}
       <View style = {{flexDirection: 'row', padding:25, alignItems:'center'}}>
         <Text style = {{fontSize:25, left:100}}>
          On Duty:
         </Text>
         <Switch
            onValueChange={ (value) => this.setState({ value: value })}
            value={ this.state.value }
            style = {{ left:130}}
            trackCollor = {{flase:'red',true:'green'}}
          />
        </View>
       {/* ##################################################  ON DUTY  ###########################################################  */}
       {/* ##################################################  MENU Items  ###########################################################  */}
       <View>
         <TouchableOpacity style = {styles.addbutton}
          onPress ={ () => {
            Actions.OrderSummary({ol:this.state.updatedItems});
          }}>
          <Text style = {styles.buttonText} > ADD NEW DISH </Text>
          </TouchableOpacity>
         <View>
           {
         this.state.presentItems.map((l, i)  => {
          return (
            <View key={i} style={{flexDirection:'column' , flexWrap:'wrap' , borderWidth:1 ,borderColor:'black',borderRadius:4,marginLeft:2,marginRight:2,marginBottom:10}} >
              <View>
                <Text style={styles.dish_name_st} >{l.dish_name}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.dish_name_st} >Price</Text>
                <Button flex right
                onPress={() => this.updateCount(l,'+')}
                title="+"
                style={{color:"black"}}/>
                <Text style={styles.price_st}>
                  {l.count}
                </Text>
                <Button flex right
                onPress={() => this.updateCount(l,'-')}
                title="-"
                style={styles.buttons}/>
                <Text style={styles.dish_name_st} >Quantity</Text>
                <Button flex right
                onPress={() => this.updateCount(l,'+')}
                title="+"
                style={styles.buttons}/>
                <Text style={styles.price_st}>
                  {l.count}
                </Text>
                <Button flex right
                onPress={() => this.updateCount(l,'-')}
                title="-"
                style={styles.buttons}/>
              </View>
            </View>
          );
       })}
         </View>
      </View>
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
    top: {
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',

    },
    dish_name_st: {
      marginTop:2,
      fontStyle:'italic',
      marginBottom: 5 ,
      marginLeft:5,
      marginRight:55,
      alignItems:'center',
      justifyContent: 'center',
      fontWeight:'400',
      fontSize:24,
    },
    price_st: {
      marginTop:2,
      fontStyle:'italic',
      marginBottom: 5 ,
      marginLeft:10,
      alignItems:'center',
      justifyContent: 'center',
      fontWeight:'400',
      fontSize:24,
    },
    title: {
      marginTop:2,
      fontStyle:'italic',
      marginBottom: 15 ,
      marginLeft:5,
      marginRight:15,
      alignItems:'center',
      justifyContent: 'center',
      fontWeight:'400',
      fontSize:36,
    },
    profileImage: {
      borderWidth:4,
      borderColor: "#1c313a",
      marginBottom: 15 ,
      width: 250,
      height: 150
    },
    addbutton: {
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
    buttons:{
       backgroundColor: "#1c313a",
       width:10,
       borderRadius:100,
       marginBottom:15,
       alignItems:'flex-end',
       justifyContent:'flex-end',
    },
    description:{
        fontSize:16,
        fontWeight:'100',
        color:'#000000',
        alignItems:'center',
      justifyContent: 'center',
      marginBottom:10,
      marginLeft:5,
      marginRight:5
    },
    price:{
      borderWidth:5 ,
      borderColor:'red',
      borderRadius:8,
      marginLeft:8,
      marginRight:8,
      marginBottom:10,
      marginTop:10 ,
      fontSize:32,
      fontWeight:'100',
      color:'#000000',
      alignItems:'center',
      justifyContent: 'center',
    }
  });

AppRegistry.registerComponent('CooksPage', () => CooksPage);

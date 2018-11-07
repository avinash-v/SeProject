import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View , TouchableOpacity,
    Dimensions,ScrollView,Button, Icon, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class DishPage extends Component{
    constructor(props){
        super(props)
        this.state = {
          dishName:"DISH NAME",
          description: "Anyone who reads Old and Middle English literary texts will be familiar with the mid-brown volumes of the EETS, with the symbol of Alfred's jewel embossed on the front cover. Most of the works attributed to King Alfred or to Aelfric, along with some of those by bishop ",
          priceDetails:"  200gms  500/-",
          cooksName:"abc",
          reviewCont:"who reads Old and Middle English literary texts will be familiar"


        }
      }

      _onPress() {
        Actions.CooksPage();
       }

       //style={{flexDirection:'row' , flexWrap:'wrap'}}>
  render() {
    return (
      <ScrollView style={styles.container}>
      <View style={styles.top}>
      <View style={{flexDirection:'row' , flexWrap:'wrap' , marginBottom:5}}>
      <Text style={styles.title}>{this.state.dishName}</Text>
      <TouchableOpacity style={styles.circularButton}>
      <Text style={{fontSize:32 , fontWeight:'200'}}>
        +
      </Text>
      </TouchableOpacity>
      </View>
      <View > 
      <Image source={require('../images/dish6.jpg')}  style={styles.profileImage} />
       <Button
        onPress={this._onPress}
        title={this.state.cooksName}
        style={styles.buttons}
        />
       </View>
       </View>

       <View  style={styles.center}></View>

       <View  style={styles.bottom}>
       <Text  style={styles.description}>{this.state.description}</Text>
       <Text style={styles.price} >{this.state.priceDetails}</Text>
       <Text style={{ color:"#000000" , fontSize:32 , fontWeight:"200"}}>
         REVIEWS : 
       </Text>
       <View style={styles.reviews}>
        <Text style={styles.description}>{this.state.reviewCont} </Text>
       </View>
       </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    top: {
      height: 300,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#87cefa'
      
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
      color:'#4169e1'
    },
    profileImage: { 
      borderWidth:4,
      borderColor: "#4169e1",
      marginBottom: 15 ,
      width: 250, 
      height: 150
    },
    buttons:{
       color:"#4169e1",
       width:100,
       height:50,
       backgroundColor:'#fff',
       borderRadius:100,
       marginBottom:15
    },
    circularButton:{
      borderWidth:1,
      alignItems:'center',
      justifyContent:'center',
      borderColor:"#4169e1",
      width:50,
      height:50,
      borderRadius:50,
      backgroundColor:"#4169e1",

    },
    center:{
        height: 20,
        backgroundColor:'#4169e1'
    },
    bottom:{
        height: 'auto',
        backgroundColor:'#ffffff',
        marginLeft: 5 ,
        marginRight: 5, 
        marginTop:15,
        marginBottom:10
    },
    description:{
        fontSize:16,
        fontWeight:'100',
        color:'#000000',
        alignItems:'center',
      justifyContent: 'center',
      marginBottom:10
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
    },
    reviews:{
      borderWidth:5 ,
      borderColor:'#4169e1',
      borderRadius:4,
      marginLeft:8,
      marginRight:8
    }
  });

AppRegistry.registerComponent('DishPage', () => DishPage);
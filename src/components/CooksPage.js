import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View , ImageBackground, TouchableOpacity,Dimensions,ScrollView,Button, Icon, Image, Slider} from 'react-native';

import {Actions} from 'react-native-router-flux';
import { Rating , ListItem } from 'react-native-elements';
import ImageSlider from 'react-native-image-slider';

import {serverConf,} from "../Globals";

import {GetDetails,} from "../functions/GetDetails"



export default class CooksPage extends Component{
    constructor(props){
        super(props)
        this.state = {
          cooksName:"COOK'S NAME",
          addr_details: "Anyone,Anyone, along Anyone, along Anyone, along Anyone, along Anyone, along Anyone, along  along with some of those by bishop ",
          ratingVal: 3,
          reviews_list: [
            {
              review: "Amazing",
            },
            {
              review: "Healthy and hygenic",
            },
            {
              review: "good",
            },
            {
              review: "HEllo , amazing",
            }

          ],
          Items_list: [
            {
              dish_name: 'Masala Dosa',
              avatar_url: '/home/admi/PIGGY/images/dish1.jpg',
              cuisine: 'SOuth Indian'
            },
            {
              dish_name: 'Arabiata Pasta',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              cuisine: 'Italian'
            },
            {
              dish_name: 'Chole Bhatura',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              cuisine: 'North Indian'
            },
            {
              dish_name: 'Amy Farha',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              cuisine: 'Vice President'
            },
            {
              dish_name: 'Amy Farha',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              cuisine: 'Vice President'
            },
          ],
        }
      }


  render() {

    const {items_cook, errors, loading} = this.props

    return (
      <ScrollView style={styles.container}  onLoad={ ndet=GetDetails.getNCookDetails() }>
      <View style={styles.top}>
      <View>
      <Text style={styles.title}>{this.state.cooksName}</Text>
      <Rating
        showRating
        type="star"
        readonly
        fractions={1}
        startingValue={this.state.ratingVal}
        imageSize={35}
        onFinishRating={this.ratingCompleted}
        onStartRating={this.ratingStarted}
        style={{ alignItems:'center'}}
        />
      <Text style={styles.description}>
        {this.state.addr_details}
      </Text>
      </View>
       </View>

       <View  style={styles.center}></View>

       <View  style={styles.bottom}>
       <View style={{height:200}}>
       <ImageSlider images={[
        '../images/cookPhoto.jpg',
        '../images/cookPhoto.jpg',
        '../images/cookPhoto.jpg',
        '../images/cookPhoto.jpg'
      ]}/>
       </View> 
       <View>
         {
       this.state.Items_list.map((l, i) => (
      <ListItem
        key={i}
        rightAvatar={{ source: {require:l.avatar_url } }}
        title={l.dish_name}
        subtitle={l.cuisine}
      />
      ))
       }
       </View>

       <Text style={{ color:"#000000" , fontSize:28 , fontWeight:"200"}}>
         REVIEWS : 
       </Text>  
       <View style={styles.reviews}>
       {
       this.state.reviews_list.map((l, i) => (
      <ListItem
        key={i}
        title={l.review}
      />
      ))
       }
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
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#87cefa',
      
    },
    title: {
      marginTop:2, 
      fontStyle:'italic',
      marginBottom: 15 ,
      marginLeft:15,
      marginRight:5,
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
    },
    reviews:{
      borderWidth:5 ,
      borderColor:'#4169e1',
      borderRadius:4,
      marginLeft:8,
      marginRight:8
    }
  });

AppRegistry.registerComponent('CooksPage', () => CooksPage);
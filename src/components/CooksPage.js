import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View , ImageBackground, TouchableOpacity,Dimensions,ScrollView,Button, Icon, Image, Slider} from 'react-native';

import {Actions} from 'react-native-router-flux';
import { Rating , ListItem } from 'react-native-elements';
import ImageSlider from 'react-native-image-slider';

import {serverConf,} from "../Globals";

import {CookDetails,} from "../functions/CookDetails"

export default class CooksPage extends Component{
    constructor(props){
        super(props)
        this.state = {
          isLoading:false,
          cookId:"chinamyi45@gmail.com",
          cooksName:"COOK'S NAME",
          phone_no: "8971", 
          addr_details: "Anyone, along Anyone, along  along with some of those by bishop ",
          ratingVal: 3,
          reviews_list: [
            "Amazing","Good"
          ],
          Items_list: [
            {
              dish_name: 'Masala Dosa',
              price: 100,
              cuisine: 'SOuth Indian',
              count:0 //Not in the database- Should be added 
            },
            {
              dish_name: 'Plain Dosa',
              price: 80,
              cuisine: 'SOuth Indian',
              count:0
            }
          ],
          OrderList:[
          ],
          no_ol:0,
        }
      }

      componentDidMount(){
        this.setState({isLoading:true})
        var data = {cookId:this.props.cookId,n:5};//this.props.cookId};
        this._getCookDetails(data);
        
      }

    
      _getCookDetails(details) {
        alert("Requested");
        fetch("http://" + serverConf.serverIP + ":" + serverConf.serverPort +"/cook/getCookDetails", {
           method: 'POST',
           headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
           body: JSON.stringify(details),
         }).then(res => res.json())
           .then((res)=>{
            if(res.ok){
            this.setState({isLoading:false});
            alert("Cooks Data Fetched");
            alert(res.data.cooksName)
            this.setState({cooksName:res.data.cooksName})
            this.setState({addr_details:res.data.addr_details})
            this.setState({ratingVal:res.data.ratingVal_avg})
             }
            }).then(()=>{
            alert("Fetching Review");
            fetch("http://" + serverConf.serverIP + ":" + serverConf.serverPort +"/review/getNReviews", {
           method: 'POST',
           headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
           body: JSON.stringify(details),
         }).then(res => res.json())
           .then((res)=>{
            if(res.ok){
            alert("Reviews Fetched");
            alert(res.data.cookId)
            this.setState({reviews_list:res.data})
             }
            })
          }).then(()=>{
            fetch("http://" + serverConf.serverIP + ":" + serverConf.serverPort +"/cook/getNDishDetails", {
            method: 'POST',
            headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
            body: JSON.stringify(details),
          }).then(res => res.json())
            .then((res)=>{
             if(res.ok){
             alert(res.data.cooksName)
             res.data.count = 0
             this.setState({Items_list:res.data})
              }
             })
          })
            .catch((error) => {
              console.error(error);
              alert("Error")
            });
             
      }
      
      
    updateCount(l){
      var nowc = -1;
      for (var i=0; i < this.state.no_ol; i++) {
        if(l.dish_name == this.state.OrderList[i].dish_name){
          nowc = 0;
          this.state.OrderList[i].count = this.state.OrderList[i].count + 1;
          l.count = this.state.OrderList[i].count;
          break;
        }
    }
    if(nowc ==-1){
      this.state.OrderList[this.state.no_ol] = {dish_name:l.dish_name , dish_price:l.price, count:1};
      this.state.no_ol = this.state.no_ol+1;
      l.count = 1;
     }
     //alert(this.state.no_ol);
     this.setState({OrderList:this.state.OrderList});
    }

  render() {
    return (
      <ScrollView style={styles.container}>
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
         "http://www.manjulaskitchen.com/blog/wp-content/uploads/aloo_paratha1.jpg",
         "https://www.vegrecipesofindia.com/wp-content/uploads/2016/10/chow-chow-bhaat-recipe-2.jpg",
         "https://www.vegrecipesofindia.com/wp-content/uploads/2016/09/methi-dosa-recipe-2.jpg",
         "https://upload.wikimedia.org/wikipedia/commons/d/d8/Puri_A.jpg"
      ]}/>
       </View> 
       <View   style={{marginTop:5,marginRight:5,marginBottom:5,marginLeft:5}}>
         {
       this.state.Items_list.map((l, i)  => {
        return (
          <View key={i} style={{flexDirection:'row' , flexWrap:'wrap' , borderWidth:1 ,borderColor:'black',borderRadius:4,marginLeft:2,marginRight:2}} >
          <View style={{width:270}}>
          <Text style={styles.dish_name_st} >{l.dish_name}: Rs {l.price}</Text> 
          <Text style={styles.price_st}></Text>
          </View>
          <Button flex right
          onPress={() => this.updateCount(l)}
          title="+"
          style={styles.buttons}/>
          <Text style={styles.price_st}>
            {l.count}
          </Text>
          </View>
        );
     })}
       </View>
       <Button
        onPress ={ () => {
          Actions.OrderSummary({ol:this.state.OrderList,cookId:this.props.cookId,no_ol:this.state.no_ol,cooksName:this.state.cooksName});
         }}
        title='ORDER'
        style={styles.buttons}
        />
       <Text style={{ color:"#000000" , fontSize:28 , fontWeight:"200"}}>
         REVIEWS : 
       </Text>  
       <View>
       {
       this.state.reviews_list.map((l, i)   => {
        return (
          <View style={styles.reviews}>
      <Text>{l.review}</Text>
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
    },
    top: {
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#87cefa',
      
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
      fontSize:22,
      color:'#4169e1'
    },
    price_st: {
      marginTop:2, 
      fontStyle:'italic',
      marginBottom: 5 ,
      marginLeft:10,
      alignItems:'flex-end',
      justifyContent: 'flex-end',
      fontWeight:'400', 
      fontSize:22,
      color:'#4169e1'
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
       width:10,
       backgroundColor:'#fff',
       borderRadius:100,
       marginBottom:15,
       alignItems:'flex-end',
       justifyContent:'flex-end',
    },
    circularButton:{
      borderWidth:1,
      alignItems:'center',
      justifyContent:'center',
      borderColor:"#4169e1",
      width:30,
      height:30,
      borderRadius:30,
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
      alignSelf:'center',
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
      borderWidth:3 ,
      borderColor:'#4169e1',
      borderRadius:4,
      marginLeft:8,
      marginRight:8,
      fontSize:22,
      marginBottom:1
    }
  });

AppRegistry.registerComponent('CooksPage', () => CooksPage);
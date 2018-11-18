import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet,TextInput, Text, View , ImageBackground, TouchableOpacity,Dimensions,ScrollView,Button, Icon, Image} from 'react-native';

import {Actions} from 'react-native-router-flux';
import { Rating , ListItem } from 'react-native-elements';
import {serverConf,} from "../Globals";
import TouchableScale from 'react-native-touchable-scale' 
import LinearGradient from 'react-native-linear-gradient' 

export default class ReviewPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            cook_rating:0,
            cook_review:"Okayish.......",
            delivery_rating:0,
        }
      }

  /*    saveReview() {
        alert("Saving Review.......")
        var data = {"custId":'', "cust_name": "", "cookId" :'', "ratingVal" : this.state.cook_rating,
         "review" : this.state.cook_review, "dg_id" : '', "rating_dg" :this.state.delivery_rating}
         //this.addReview(data);
      }*/

      addReview(details){
        alert("Requested");
        fetch("http://" + serverConf.serverIP + ":" + serverConf.serverPort +"/review/addReview", {
           method: 'POST',
           headers: { 'Accept': 'application/json','Content-Type': 'application/json',},
           body: JSON.stringify(details),
         }).then(res => res.json())
           .then((res)=>{
            if(res.ok){
            alert("Thank you for the review!!");
             }
            })
            .catch((error) => {
              console.error(error);
              alert("Error")
            });
      }
    
    render() {
        return (
        <ScrollView>
          <View>
       <Text style={styles.delivered}>
         ORDER DELIVERED !!!!
       </Text>  
       <Text style={styles.reviews}>Please Rate us and help us improve</Text>
       <Text style={styles.title}>The Food:</Text>
       <Rating
        showRating
        type="star"
        fractions={1}
        startingValue={0}
        imageSize={35}
        onFinishRating={ (rating) => {
          this.setState({cook_rating:rating});
        alert("Rating is: " + rating);
        }}
        onStartRating={this.ratingStarted}
        style={{ alignItems:'center'}}
        />
        <Text style={styles.title}>Review the cook!!</Text>
        <TextInput
          style={{width:256 , height: 50 ,borderWidth:1,alignSelf:'center',
            borderColor:'black',
            borderRadius:2,}}
          onChangeText={(cook_review) => this.setState({cook_review})}
          value={this.state.cook_review}
        />
        <Text style={styles.title} >The Delivery:</Text>
       <Rating
        showRating
        type="star"
        fractions={1}
        startingValue={0}
        imageSize={35}
        onFinishRating={ (rating) => {
          this.setState({delivery_rating:rating});
        alert("Rating is: " + rating);
        }}
        onStartRating={this.ratingStarted}
        style={{ alignItems:'center',marginBottom:5}}
        />
        </View>
        <View>
        <Button
  title="SAVE REVIEW"
  titleStyle={{ fontWeight: "700" }}
  buttonStyle={{
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 100,
    height: 45,
    borderRadius: 5}}
    onPress ={ () => {
        alert("Saving Review.......");
        alert("CustId",this.props.custId);
        var data = {"custId":'', "cust_name":'', "cookId" :'', "ratingVal" : this.state.cook_rating,
         "review" : this.state.cook_review, "dg_id" : '', "rating_dg" :this.state.delivery_rating};
         this.addReview(data);
     }}
      />
        </View>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
reviews:{
    marginLeft:8,
    marginRight:8,
    alignItems:'center',
    justifyContent: 'center',
    fontSize:22,
    fontWeight:"100",
  },
  title: {
    fontStyle:'italic',
    marginBottom: 5 ,
    marginLeft:5,
    marginRight:75,
    alignItems:'center',
    justifyContent: 'center',
    fontWeight:'400', 
    fontSize:20,
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
    fontSize:24,
    color:'#4169e1'
  },
  delivered:{ 
    borderWidth:3,
    borderColor:'#87cefa',
    borderRadius:2,
    marginTop:20, 
    fontStyle:'italic',
    marginBottom: 20 ,
    marginLeft:10,
    marginRight:5,
    color:"#000000" ,
     fontSize:28 ,
      fontWeight:"200",
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor:'#87cefa',
  },
});



AppRegistry.registerComponent('ReviewPage', () => ReviewPage);
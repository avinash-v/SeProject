import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View , ImageBackground, TouchableOpacity,Dimensions,ScrollView,Button, Icon, Image} from 'react-native';

import {Actions} from 'react-native-router-flux';
import { Rating , ListItem } from 'react-native-elements';

import TouchableScale from 'react-native-touchable-scale' 
import LinearGradient from 'react-native-linear-gradient' 

export default class ReviewPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            cook_rating:0,
            delivery_rating:0
        }
      }

      cook_ratingComp(rating) {
        this.state.cook_rating = rating;
        alert("Rating is: " + rating);
      }
    
      del_ratingComp(rating) {
        this.state.delivery_rating = rating;
        alert("Rating is: " + rating);
      }
    
    render() {
        return (
        <ScrollView>
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
        onFinishRating={this.cook_ratingComp}
        onStartRating={this.ratingStarted}
        style={{ alignItems:'center'}}
        />
        <Text style={styles.title} >The Delivery:</Text>
       <Rating
        showRating
        type="star"
        fractions={1}
        startingValue={0}
        imageSize={35}
        onFinishRating={this.del_ratingComp}
        onStartRating={this.ratingStarted}
        style={{ alignItems:'center'}}
        />
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
    fontSize:24,
    fontWeight:"100",
  },
  title: {
    marginTop:2, 
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
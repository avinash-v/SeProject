import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View , ImageBackground, TouchableOpacity,Dimensions,ScrollView,Button, Icon, Image} from 'react-native';

import {Actions} from 'react-native-router-flux';
import { Rating , ListItem } from 'react-native-elements';

import TouchableScale from 'react-native-touchable-scale' 
import LinearGradient from 'react-native-linear-gradient' 

export default class OrderSummary extends Component{
    constructor(props){
        super(props)
        this.state = {
            dishes_list: [
                {
                  dish_name: 'Masala Dosa',
                  price: '80'
                },
                {
                    dish_name: 'Paratha',
                    price: '100'
                }
              ],
        }
      }


    _ToLoad(){
      var data = {DishId:this.props.dishName}
      this._getDishDetails(data)
    }
    
    render() {
        return (
        <ScrollView>
       <Text style={{ color:"#000000" , fontSize:28 , fontWeight:"200"}}>
         ORDERED ITEMS:
       </Text>  
       <View>
         {
       this.props.ol.map((l, i)  => {
        return (
          <View key={i} style={{flexDirection:'row' , flexWrap:'wrap' , borderWidth:1 ,borderColor:'black',borderRadius:4,marginLeft:2,marginRight:2}} >
          <Text style={styles.dish_name_st} >{l.dish_name}: Rs {l.dish_price} * {l.count} = {l.dish_price*l.count}</Text> 
          <Text style={styles.price_st}></Text>
          </View>
        );
     })}
       </View>
    </ScrollView>
  
  );
}
}

const styles = StyleSheet.create({
reviews:{
    borderWidth:5 ,
    borderColor:'#4169e1',
    borderRadius:4,
    marginLeft:8,
    marginRight:8
  },
  dish_name_st: {
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
});



AppRegistry.registerComponent('OrderSummary', () => OrderSummary);
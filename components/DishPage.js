import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View , TouchableOpacity,
    Dimensions,ScrollView,Button,  Image} from 'react-native';


export default class DishPage extends Component{
    constructor(props){
        super(props)
        this.state = {
          description: "Anyone who reads Old and Middle English literary texts will be familiar with the mid-brown volumes of the EETS, with the symbol of Alfred's jewel embossed on the front cover. Most of the works attributed to King Alfred or to Aelfric, along with some of those by bishop ",
          priceDetails:"500/-"


        }
      }

      _onPress() {
        console.log('pressed');
       }

  render() {
    return (
      <ScrollView style={styles.container}>
      <View style={styles.top}>
      <Text style={styles.title}>DISH NAME</Text>
      <View style={{flexDirection:'row' , flexWrap:'wrap'}}>
      <Image source={require('../images/dish1.jpg')}  style={styles.profileImage} />
       <Button
        onPress={this._onPress}
        title="Learn More"
        style={styles.buttons}
        />
       </View>
       </View>

       <View  style={styles.center}></View>

       <View  style={styles.bottom}>
       <Text>{this.state.description}</Text>
       <Text>{this.state.priceDetails}</Text>
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
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#87cefa'
      
    },
    title: {
      marginTop:5, 
      fontStyle:'italic',
      marginBottom: 15 ,
      alignItems:'center',
      justifyContent: 'center',
      fontWeight:'400', 
      fontSize:36,
      color:'#4169e1'
    },
    profileImage: { 
      borderWidth:4,
      borderColor: "#4169e1",
      marginRight:10,
      width: 100, 
      height: 64
    },
    buttons:{
        color:"#4169e1",
        width:100,
       height:100,
       backgroundColor:'#fff',
       borderRadius:100
    },
    center:{
        height: 20,
        backgroundColor:'#4169e1'
    },
    bottom:{
        height: 500,
        backgroundColor:'#ffffff',
    },
    description:{
        fontSize:24,
        fontWeight:'200',
        color:'#000000',
        alignItems:'center',
      justifyContent: 'center'
    }
  });

AppRegistry.registerComponent('DishPage', () => DishPage);

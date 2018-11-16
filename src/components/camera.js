import React, {Component} from 'react';
import {DrawerNavigator} from 'react-navigation';
import {Platform, StyleSheet, Text, View, Image,Alert, Button, TouchableOpacity, ImageBackground, Switch, ScrollView} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Actions } from 'react-native-router-flux';
import { Slider, Avatar, ListItem, Rating } from 'react-native-elements'
import call from 'react-native-phone-call'


export default class Routes extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      userName: this.props.userName,
      cookName: '',
      cooksPhoto: '',
      cookName: '',
      cookPhone: '',
      cookAddress: '',
      currentLocation: '',
      destLocation: '',
      totalItemCount: '',
      location: 2,
      photos:[],
    }
  }

  _handleButtonPress = () => {
     CameraRoll.getPhotos({
         first: 5,
         assetType: 'Photos',
       })
       .then(r => {
         this.setState({ photos: r.edges });
       })
       .catch((err) => {
          //alert("Error Loading Images")
       });
     };


  render() {
   return (
     <View>
     <TouchableOpacity onPress={this.showMenu} style = {{top:0,height:70,width:70}}>
      <Text>LOAD IMAGES</Text>
      </TouchableOpacity>
       <ScrollView>
         {this.state.photos.map((p, i) => {
         return (
           <Image
             key={i}
             style={{
               width: 300,
               height: 100,
             }}
             source={{ uri: p.node.image.uri }}
           />
         );
       })}
       </ScrollView>
     </View>
   );
  }
}

import React,{Component} from 'react'
import { AppRegistry } from 'react-native';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
  } from 'react-native';
class Dashboard extends Component {
    render(){
        return(
            <View>
                <Text> Dashboard</Text>
                {/* <Image source={require('./CR.jpg')} /> */}
                </View>
        )
    }
}
export default Dashboard
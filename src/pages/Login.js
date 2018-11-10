import React, {Component} from 'react';
import {
        StyleSheet,
        Text,
        View,
        TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import {
	serverConf,
} from "../Globals";

import {
	LoginFunctions,
} from "../functions/Login_Funcs"

import Logo from "../components/Logo"
import Form from "../components/Form"


BackgroundGeolocation.configure({
  desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
  stationaryRadius: 50,
  distanceFilter: 50,
  notificationTitle: 'Background tracking',
  notificationText: 'enabled',
  debug: true,
  startOnBoot: false,
  stopOnTerminate: true,
  locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
  interval: 1000,
  fastestInterval: 500,
  activitiesInterval: 1000,
  stopOnStillActivity: false,
  url: "http://" + serverConf.serverIP + ":" + serverConf.serverPort + "/delivery/locationUpdate",
  httpHeaders: {
	'Accept': "application/json", "Content-Type": "application/json"
  },
  // customize post properties
  postTemplate: {
	lat: '@latitude',
	lon: '@longitude'
  }
});

export default class Login extends Component<{}> {

		constructor(props){
			super(props);
			BackgroundGeolocation.start();
			BackgroundGeolocation.on('location', (location) => {
			});
		}

        signUp(){
            Actions.SignUp();
        }

        render() {
                return (

                        <View style={styles.container}>
                                <Logo/>
                                <Form type="Login"/>
                                <View style={styles.signupTextCont}>
                                        <Text style={styles.signupText}>Not Registered?</Text>
                                        <TouchableOpacity onPress={this.signUp}>
                                                <Text style={styles.signupButton}> SignUp Now !</Text>
                                        </TouchableOpacity>
                                </View>
                        </View>
                )
        }
}

const styles = StyleSheet.create({
        container: {
                backgroundColor: '#455a64',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center'
        },
        signupTextCont: {
                flexGrow: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingVertical: 16,
                marginVertical: 16,
                flexDirection: 'row'
        },
        signupText: {
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: 16
        },
        signupButton: {
                color: '#ffffff',
                fontSize: 16,
                fontWeight: '500'
        }
});

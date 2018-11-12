import React, {Component} from 'react';
import {
        StyleSheet,
        Text,
        View,
        StatusBar
} from 'react-native';

import Routes from "./src/Routes";

import {serverConf} from "./src/Globals";
import {DeliveryTrackingFuncs} from "./src/functions/Delivery_Tracking_Funcs"

import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

BackgroundGeolocation.configure({
	  desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
	  stationaryRadius: 50,
	  distanceFilter: 50,
	  url: '',
	  notificationTitle: 'Background tracking',
	  notificationText: 'enabled',
	  debug: false,
	  startOnBoot: false,
	  stopOnTerminate: true,
	  locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
	  stopOnStillActivity: false,
});

BackgroundGeolocation.on('location', function(location){
	var data = {
		'lat': location.latitude,
		'lon': location.longitude,
		'id': global.customerDetails.id
	}

	DeliveryTrackingFuncs.updateLocation(serverConf.serverIP,
					serverConf.serverPort,
					data
				)
});

BackgroundGeolocation.on('stationary', (stationaryLocation) => {
	var data = {
  		'lat': location.latitude,
  		'lon': location.longitude,
  		'id': global.customerDetails.id
  	}

  	DeliveryTrackingFuncs.updateLocation(serverConf.serverIP,
  					serverConf.serverPort,
  					data
  				)
});


global.locationModule = BackgroundGeolocation;


export default class App extends Component<{}> {
        render() {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor= "#1c313a"
                                        barStyle= "light-content"
                                />
                                <Routes />
                        </View>

                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
});

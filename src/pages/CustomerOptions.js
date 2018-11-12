import React, {Component} from 'react';
import {
        StyleSheet,
        Text,
        View,
        TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class CustomerOptions extends Component<{}> {

		constructor(props){
			super(props);
		}

		componentDidMount(){
			global.locationModule.stop();
			global.locationModule.start();
		}

		buttonPress(type){
			if(type == 'customer'){
				global.customerDetails.type = type;
				Actions.DeliverTracker();
			} else if(type == 'cook'){
				global.customerDetails.type = type;
			} else if(type == 'delivery'){
				global.customerDetails.type = type;
				global.locationModule.start();
			} else {
				alert('Invalid Type Choosen');
			}
		}

        render() {
                return (
                        <View style={styles.container}>
							<TouchableOpacity style={styles.button} onPress= {()=> this.buttonPress('customer')}>
									<Text style={styles.buttonText}>Customer</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.button} onPress= {()=> this.buttonPress('cook')}>
									<Text style={styles.buttonText}>Cook</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.button} onPress= {()=> this.buttonPress('delivery')}>
									<Text style={styles.buttonText}>Delivery</Text>
							</TouchableOpacity>
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
		button: {
                width: 300,
                borderRadius: 25,
                marginVertical: 10,
                paddingVertical: 12,
                backgroundColor: "#1c313a"
        },
        buttonText: {
                fontSize: 16,
                fontWeight: '500',
                color: '#ffffff',
                textAlign: 'center',
        },
});

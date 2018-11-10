import React, {Component} from 'react';
import {
        StyleSheet,
        Text,
        View,
        TextInput,
        TouchableOpacity,
		Linking
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'

import {
	serverConf,
} from "../Globals";

import {
	LoginFunctions,
} from "../functions/Login_Funcs"

export default class Form extends Component<{}> {

	constructor(props) {
		super(props);
		this.state = {
					userName: '',
					password: '',
				};
	}

	buttonPress(type){
		if(!this.state.password.trim() || !this.state.userName.trim()){
			alert("Check details!");
			return false;
		}
		if( type == "Login"){
			LoginFunctions.verify(
				serverConf.serverIP,
				serverConf.serverPort,
				this.state,
			)
			.then(response => response.json())
			.then((response)=> {
				if(response.ok){
					alert("Logged In ! :"+JSON.stringify(response));
					// Linking.openURL(`https://maps.apple.com/?q=bangalore&ll=10,10`);
				} else {
					alert("Invalid Username or Password! :"+JSON.stringify(response));
				}
			})
			.catch((error) => {
				alert("Error :" +error);
			});

		} else if( type == "SignUp"){
			LoginFunctions.register(
				serverConf.serverIP,
				serverConf.serverPort,
				this.state,
			)
			.then(response => response.json())
			.then((response)=> {
				if(response.ok){
					alert("Registered ! :"+response.ok);
				} else {
					alert("Username might be in use");
				}
			})
			.catch((error) => {
				alert("Error :" +error);
			})
		}
	}

        render() {
                return (
                        <View style={styles.container}>
                                <TextInput
                                        style={styles.inputBox}
                                        placeholder="Email-ID"
                                        placeholderTextColor="#ffffff"
                                        selectionColor="#ffffff"
                                        keyboardType="email-address"
										onChangeText={(text) => this.setState({userName: text})}
                                        onSubmitEditing={()=> this.password.focus()}
                                />
                                <TextInput
                                        style={styles.inputBox}
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        placeholderTextColor="#ffffff"
										onChangeText={(text) => this.setState({password: text})}
                                        ref={(input) => this.password = input}
                                />
                                <TouchableOpacity style={styles.button} onPress= {()=> this.buttonPress(this.props.type)}>
                                        <Text style={styles.buttonText}>{this.props.type}</Text>
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
        inputBox: {
                width: 300,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: 25,
                paddingHorizontal: 25,
                fontSize: 16,
                color: "#ffffff",
                marginVertical: 10
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
        }
});

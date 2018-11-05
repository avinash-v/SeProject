import React, {Component} from 'react';
import {
        StyleSheet,
        Text,
        View,
        TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';


import Logo from "../components/Logo"
import Form from "../components/Form"

export default class Login extends Component<{}> {

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

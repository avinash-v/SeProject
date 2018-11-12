import React, {Component} from 'react';
import {
        StyleSheet,
        Text,
        View,
        TouchableOpacity,
		ProgressBarAndroid
} from 'react-native';

import {
	serverConf,
} from "../Globals";

import {DeliveryTrackingFuncs} from "../functions/Delivery_Tracking_Funcs"

export default class DeliverTracker extends Component<{}> {

	constructor(props){
		super(props);
		this.state = {
			'progress': .1,
		}
		alert(JSON.stringify(global.customerDetails));
	}

	componentDidMount(){
		this._progressBarInterval = setInterval(this.updateProgressBar, 4000);
	}

	componentWillUnmount() {
		clearInterval(this._progressBarInterval);
	}

	updateProgressBar(){
		
	}

	render() {
			return (
					<View style={styles.container}>
						<Text>

						</Text>
						<ProgressBarAndroid
							style={styles.progressBar}
							styleAttr="Horizontal"
							indeterminate={false}
							progress={this.state.progress}
						/>
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
        },
		progressBar: {
		    width: 200,
		    transform: [{ scaleX: 1.0 }, { scaleY: 2.5 }],
		 },
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
/*
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
*/

import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions,TouchableHighlight} from 'react-native';
//import { SearchBar } from 'react-native-elements'
  import { Button, SearchBar, Tile} from 'react-native-elements';
  import Icon from 'react-native-vector-icons/FontAwesome';
  //import { SearchBar } from 'react-native-elements'

// function 
onPress = () => {
    console.log('vfid')
  }
something = () => {
    console.log('print to console')
    console.log(this.text)
  }


export default class App extends Component {
  constructor() {
    super()

    this.state = {
      width: Dimensions.get('window').width
    }
  }

  render() {
    const { width } = this.state;
    return (

  /*
  <View>
    <SearchBar
  clearIcon={{ color: 'red' }}
  searchIcon={false} // You could have passed `null` too
  //onChangeText={someMethod}
  //onClear={someMethod}
  placeholder='Type Here...' />
  <Button title="Click" />
  
  <Tile
  imageSrc={require('./src/img/iron_man.jpg')}
  title="Iron man"
  featured
  caption="Some Caption Text" />


<Text>Hello World!</Text>  
</View> */
<View>
<SearchBar
  clearIcon={{ color: 'red' }}
  searchIcon={false} // You could have passed `null` too
  onChangeText={something(this.text)}
  //onClear={someMethod}
  placeholder='Type Here...' />
  <Text> Choose your cuisine </Text>
<View style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: '#ecf0f1'
      }}>
        <Tile
          width={width/2}
          featured
          caption="1"
          //imageSrc={require('./src/img/iron_man.jpg')}
          //title="Iron man"
          imageSrc={require('./src/img/indian.jpg')}
          title="Indian"

        />
        <Tile
          width={width/2}
          featured
          caption="2"
          imageSrc={require('./src/img/chinese.jpg')}
          title="Chinese"

        />
        <Tile
          width={width/2}
          featured
          caption="3"
          imageSrc={require('./src/img/american.jpg')}
          title="American"
        />
        <Tile
          width={width/2}
          featured  
          caption="4"
          imageSrc={require('./src/img/italian.jpg')}
          title="Italian"
        />
        <Tile
          width={width/2}
          featured  
          caption="5"
          imageSrc={require('./src/img/kannada.jpg')}
          title="Namma Nadu"
        />

        
          <TouchableHighlight
         style={styles.button}
         onPress={this.onPress} >
          <Tile
          width={width/2}
          featured  
          caption="6"
          imageSrc={require('./src/img/bakery.jpg')}
          title="Bakery"
          />
         </TouchableHighlight>
      </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  half1: {
    flex: 1,
    //height: 'number, string'
    backgroundColor: 'red'
  },
  half1: {
    flex: 1,
    //height: 'number, string'
    backgroundColor: 'red'
  }
})
import React, {Component} from 'react';
import {AppRegistry,ScrollView,StyleSheet, Text, View, Dimensions,TouchableHighlight,TouchableOpacity,TextInput,Image} from 'react-native';
import { Button, SearchBar, Tile} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';


export default class SearchPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: Dimensions.get('window').width,
      text: "Search For Dishes or Cooks"
    }
  }

  changePage(qs){
    alert(qs)
    Actions.DishesList({queryStr:qs});
  }

  render() {
    const { width } = this.state;
    return (
<ScrollView>
<View style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: '#ecf0f1'
      }}>
  <TextInput
          style={{width:256 , height: 50}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button flex right
         onPress ={ () => {
          Actions.DishesList({queryStr:this.state.text});
         }}
          title="SEARCH"
          style={styles.buttons}/>
</View>
  <Text style={styles.title}>Pick the cuisine you wish to eat.....</Text>
<View style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: '#ecf0f1'
      }}>
        <TouchableOpacity onPress={() => this.changePage("North Indian")}>
       <Tile
          width={width/2}
          featured
          caption="1"
          //title="Iron man"
          imageSrc={require('../images/indian.jpg')}
          title="Indian"
        />
        </TouchableOpacity>
        <Tile
          width={width/2}
          featured
          caption="2"
          imageSrc={require('../images/chinese.jpg')}
          title="Chinese"

        />
        <Tile
          width={width/2}
          featured
          caption="3"
          imageSrc={require('../images/american.jpg')}
          title="American"
        />
        <Tile
          width={width/2}
          featured  
          caption="4"
          imageSrc={require('../images/italian.jpg')}
          title="Italian"
        />
        <Tile
          width={width/2}
          featured  
          caption="5"
          imageSrc={require('../images/kannada.jpg')}
          title="Namma Nadu"
        />

        
          <TouchableHighlight
         style={styles.button}
         onPress={this.onPress} >
          <Tile
          width={width/2}
          featured  
          caption="6"
          imageSrc={require('../images/bakery.jpg')}
          title="Bakery"
          />
         </TouchableHighlight>
      </View>
      </ScrollView>
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
  },
  title: {
    marginTop:2, 
    fontStyle:'italic',
    marginBottom: 15 ,
    marginLeft:5,
    marginRight:15,
    alignItems:'center',
    justifyContent: 'center',
    fontWeight:'400', 
    fontSize:36,
    color:'#4169e1'
  },
  buttons:{
     color:"#4169e1",
     width:10,
     backgroundColor:'#fff',
     borderRadius:100,
     marginBottom:15,
     alignItems:'flex-end',
     justifyContent:'flex-end',
  },
});

AppRegistry.registerComponent('SearchPage', () => SearchPage);
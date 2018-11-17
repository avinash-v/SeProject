import React, {Component} from 'react';
import {AppRegistry,FlatList,ScrollView,StyleSheet, Text, View, Dimensions,TouchableHighlight,TouchableOpacity,TextInput,Image} from 'react-native';
import { Button, SearchBar, Tile} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';


export default class SearchPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: Dimensions.get('window').width,
      text: "Search For Dishes or Cooks",
      data: [
        {title: "NORTH INDIAN",  image:"https://www.asian-recipe.com/cms3/wp-content/uploads/2012/10/indian-cuisine-introduction.jpg", query:'North Indian',},
        {title: "CHINESE",   image:"https://i.ndtvimg.com/i/2016-06/noodles-625_625x350_41465896870.jpg?downsize=650:400&output-quality=70&output-format=webp", query:'chinese',} ,
        {title: "ITALIAN",  image:"https://www.militarytownadvisor.com/file/wp-uploads/2013/07/rev2-1024x768.jpg", query:'italian',},
        {title: "AMERICAN",   image:"https://spoonacular.com/application/frontend/images/academy/American-cuisine.jpg", query:'american',},
        {title: "SOUTH INDIAN",   image:"https://lifeandtrendz.com/wp-content/uploads/2015/08/Onam-special-Sadhya-at-Ente-Keralam-2-300x196.jpg", query:'namma_nadu',},
        {title: "BAKERY",   image:"https://static.standard.co.uk/s3fs-public/thumbnails/image/2015/03/18/15/Ottolenghi.jpg?width=1000&height=614&fit=bounds&format=pjpg&auto=webp&quality=70&crop=16:9,offset-y0.5",query:'bakery',},
      ]
    }
  }
  onPressCuisine = (t) => {
    alert(t)
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
          Actions.DishesList({queryStr:this.state.text,custId:"sameergadicherla56@gmail.com", cust_name:"Sameer Gadicherla"});
         }}
          title="SEARCH"
          style={styles.buttons}/>
</View>
  <Text style={styles.title_he}>Pick the cuisine you wish to eat.....</Text>

<View style={styles.container}>
         <FlatList style={styles.list}
           contentContainerStyle={styles.listContainer}
           data={this.state.data}
           horizontal={false}
           numColumns={2}
           keyExtractor= {(item) => {
             return item.id;
           }}
           ItemSeparatorComponent={() => {
             return (
               <View style={styles.separator}/>
             )
           }}
           renderItem={(post) => {
             const item = post.item;
             return (
               <View style={styles.card}>

                <View style={styles.cardHeader}>
                   <View>
                     <Text style={styles.title}>{item.title}</Text>
                     <Text style={styles.price}>{item.price}</Text>
                   </View>
                 </View>

                 <Image style={styles.cardImage} source={{uri:item.image}}/>

                 <View style={styles.cardFooter}>
                   <View style={styles.socialBarContainer}>
                     <View style={styles.socialBarSection}> 
                       <TouchableOpacity style={styles.socialBarButton} onPress={() => this.changePage(item.query)}>
                         <Image style={styles.icon} source={{uri: 'https://freeiconshop.com/wp-content/uploads/edd/food-solid.png'}}/>
                         <Text style={[styles.socialBarLabel, styles.buyNow]}>SELECT</Text>
                       </TouchableOpacity>
                     </View>
                   </View>
                 </View>
               </View>
             )
           }}/>
       </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  title_he: {
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
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 10,
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
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white",
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  },
  price:{
    fontSize:16,
    color: "green",
    marginTop: 5
  },
  buyNow:{
    color: "purple",
  },
  icon: {
    width:25,
    height:25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('SearchPage', () => SearchPage);
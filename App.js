 import React, { Component } from 'react';
 import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Image,
   Alert,
   ScrollView,
   FlatList,
 } from 'react-native';

 export default class Store extends Component {

   constructor(props) {
     super(props);
     this.state = {
      dish_list: [{dish_name: "IDLY",  price:"Rs. 25.00"},
      {dish_name: "MASALA DOSA",  price:"Rs. 30.00"}
      ],
      images_lst : [
        "http://2.bp.blogspot.com/-1Vy8ilCzfok/TacfNwOU_TI/AAAAAAAAAM8/50Y8NDG2FM8/s1600/Samabr.jpg",
        "http://feenix.co.in/wp-content/uploads/2017/12/7-696x364.jpg",
        "https://www.vegrecipesofindia.com/wp-content/uploads/2016/10/chow-chow-bhaat-recipe-2.jpg",
        "https://www.vegrecipesofindia.com/wp-content/uploads/2016/09/methi-dosa-recipe-2.jpg",
        "http://www.manjulaskitchen.com/blog/wp-content/uploads/aloo_paratha1.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/d8/Puri_A.jpg",
       "https://lh4.ggpht.com/-br4XlnfcwRk/VK5yMKDlSuI/AAAAAAAAj9s/6dR0qKpfgL4/w1200-h630-p-k-no-nu/Chapati_thumb%25255B2%25255D.jpg?imgmax=800",
       "https://thumbs.dreamstime.com/z/south-indian-meals-served-banana-leaf-traditional-cuisine-57371591.jpg",
      ],
       data: [
         {title: "IDLY",  price:"Rs. 25.00", image:"http://2.bp.blogspot.com/-1Vy8ilCzfok/TacfNwOU_TI/AAAAAAAAAM8/50Y8NDG2FM8/s1600/Samabr.jpg"},
         {title: "MASALA DOSA",  price:"Rs. 30.00", image:"http://feenix.co.in/wp-content/uploads/2017/12/7-696x364.jpg"} ,
         {title: "CHOW CHOW BATH", price:"Rs 25.00", image:"https://www.vegrecipesofindia.com/wp-content/uploads/2016/10/chow-chow-bhaat-recipe-2.jpg"},
         {title: "PLAIN DOSA",  price:"Rs. 25.00", image:"https://www.vegrecipesofindia.com/wp-content/uploads/2016/09/methi-dosa-recipe-2.jpg"},
         {title: "ALOO PARATHA",  price:"Rs. 30.00", image:"http://www.manjulaskitchen.com/blog/wp-content/uploads/aloo_paratha1.jpg"},
         {title: "PURI",  price:"Rs. 30.00", image:"https://upload.wikimedia.org/wikipedia/commons/d/d8/Puri_A.jpg"},
         {title: "CHAPATI",  price:"Rs. 20.00", image:"https://lh4.ggpht.com/-br4XlnfcwRk/VK5yMKDlSuI/AAAAAAAAj9s/6dR0qKpfgL4/w1200-h630-p-k-no-nu/Chapati_thumb%25255B2%25255D.jpg?imgmax=800"},
         {title: "PARATHA",  price:"Rs. 30.00", image:"https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjfzOLy2cHeAhUSbisKHXXdDlEQjRx6BAgBEAU&url=https%3A%2F%2Ffood.ndtv.com%2Frecipe-kootoo-ka-parantha-98863&psig=AOvVaw0Cfq6_7Lorn5EyqAw97Wtp&ust=1541660161407241"},
         {title: "SOUTH INDIAN MEALS",  price:"Rs. 60", image:"https://thumbs.dreamstime.com/z/south-indian-meals-served-banana-leaf-traditional-cuisine-57371591.jpg"},
         {title: "NORTH INDIAN MEALS",  price:"Rs. 80", image:"https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiavoe_18HeAhWSinAKHZVEAaUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.watscooking.com%2Fdishes%2Fnorth-indian-meals%2F839786&psig=AOvVaw1FZ4FG4gaOjfosGmi_VoK6&ust=1541659278718503"},

       ]
     };
   }

   addProductToCart = () => {
     Alert.alert('Success', 'The product has been added to your cart')
     var data = indian ;
     alert(data);
   }

   render() {
     return (
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
                       <TouchableOpacity style={styles.socialBarButton} onPress={() => this.addProductToCart()}>
                         <Image style={styles.icon} source={{uri: 'https://png.icons8.com/nolan/96/3498db/add-shopping-cart.png'}}/>
                         <Text style={[styles.socialBarLabel, styles.buyNow]}>Buy Now</Text>
                       </TouchableOpacity>
                     </View>
                   </View>
                 </View>
               </View>
             )
           }}/>
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container:{
     flex:1,
     marginTop:20,
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

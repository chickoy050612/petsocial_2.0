import React from 'react';
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View,Linking, Button, Image,ImageBackground, ScrollView, FlatList} from 'react-native';
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {getPosts, likePost, unlikePost,updateCategory} from '../actions/post'
import { getUser } from '../actions/user'
import styles from '../styles.js'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Category from '../components/Category'
import moment from 'moment' 
import { WebBrowser } from 'expo';
class Home extends React.Component {

  //if mount load feed
  componentDidMount(){
    this.props.getPosts("Home")
    //this.updateCategory
  }


  likePost = (post) => {
    //storing current login user to uid as reference to like post
    const { uid } = this.props.user
    //console.log("home:1. categ: " + this.props.Category + " post.feed" + JSON.stringify(this.props.post.feed))
    //console.log("home:2. show post: " + JSON.stringify(post))
    if(post.likes.includes(uid)){
      this.props.unlikePost(post)
    } else{
      this.props.likePost(post)
    }

  }

  //using Flat list able to return image at the same time loop data collection
//FlatList combining the ScrollView and VirtualizedList props
  
  navigateMap = (item) => {
    this.props.navigation.navigate('Map',
    { location: item.postLocation })
  }

  goToUser = (user) => {
    this.props.getUser(user.uid)
		this.props.navigation.navigate('Profile')
  }
  
  render() {
    if (this.props.post === null) return null
    return (
      <View style={styles.container}>


          <View style={{ height: 130, marginTop: 20 }}>
              <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
              >
                  <Category imageUri={require('../assets/cat-home.jpg')}
                      name="Home" 
                  />
                  <Category imageUri={require('../assets/cat-shop.jpg')}
                      name="PetShops" 
                  />
                  <Category imageUri={require('../assets/cat-clinic.jpg')}
                      name="Clinic"
                  />
                  <Category imageUri={require('../assets/cat-products.jpg')}
                      name="Products"
                  />
              </ScrollView>
          </View>

        <FlatList
          data = {this.props.post.feed}
          renderItem = {({item})=>{
            const liked = item.likes.includes(this.props.user.uid)
            return (
            <View >
              <View style={[styles.row, styles.space]}>
                  <View style={[styles.row, styles.center]}>
                    <TouchableOpacity onPress={() => this.goToUser(item)}>
                      <Image style= {styles.roundImage} source = {{uri: item.photo}}/> 
                    </TouchableOpacity>
                    <Text style={{color:'#e63b7a'}}>{item.username}</Text>
                    <Text style={[styles.gray, styles.small]}>.{moment(item.postDate).format('ll')}</Text>
                  </View>
              </View>
                <View>
                  <TouchableOpacity onPress={() => this.navigateMap(item)}>
                      <Text>{item.postLocation ? item.postLocation.name : null}</Text>
                    </TouchableOpacity>
                </View>
                {/* <Ionicons style={{padding:5}} name='ios-paw' size={20} />// */}
                <TouchableOpacity onPress={() => this.likePost(item)}>
                  <ImageBackground style= {styles.postPhoto} source = {{uri: item.postPhoto}} >
                    <MaterialCommunityIcons style={{padding:5,fontWeight:'bold',textAlign:'right'}} name={liked ? 'paw' : 'paw'} size={30} color={liked ?  '#e63b7a' : '#adadad'}/>
                  </ImageBackground> 
                </TouchableOpacity>

              <View style={styles.row}>
                {/*<Ionicons style={{padding:5}} name='ios-heart-empty' size={20} /> */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)}>
                    <MaterialCommunityIcons style={{padding:5}} name='comment-text-outline' size={20} />
                </TouchableOpacity>
                {/* <Ionicons style={{padding:5}} name='ios-arrow-dropright' size={20} /> */}
              </View> 
             
              <Text style={{}}>{item.postDescription}</Text>
             
            </View>
            )


          }}
        />
      </View>
    );
  }
  
}

//redux - global state/variable (passing of variables)
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({getPosts,likePost, unlikePost,updateCategory,getUser },dispatch)
}

const mapStateToProps = (state) => {
    return {
        post: state.post,
        user: state.user //from redux
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Home) 

  //rendering image from post array
// using ScrollView
//  <ScrollView>
//   {this.props.post.feed.map((post)=>{ //looping feed using .map
//     return(
//         <View>
//           <Image style= {styles.postPhoto} source = {{uri: post.postPhoto}}/> 
//           <Text>{post.postDescription}</Text>
//         </View>
//     )
//   })}
// </ScrollView> 
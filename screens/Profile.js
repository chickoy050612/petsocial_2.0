import React from 'react';
import firebase from 'firebase';
import styles from '../styles.js'
import { Text, View,Button, Image, FlatList, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { getMessages } from '../actions/message.js'
import { Ionicons, MaterialCommunityIcons, FontAwesome  } from '@expo/vector-icons';

class Profile extends React.Component {

  componentDidMount = () => {
    this.props.getMessages()
  }

//   logOutPress() {
//     firebase.auth().signOut();   // <== This will signout from firebase
//     //AsyncStorage.clear();   // <== This will clear the userId from storage
//     this.props.navigation.navigate('Login');   // <== We navigate to the loading screen we set earlier, which will check if there is a userId and navigate accordingly 
//  }




  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Profile</Text>
  //       <Image style={{
  //         width: 150,
  //         height: 150,
  //         borderRadius: 90,
  //         padding: 1,
  //         margin: 5,
  //       }} source={{uri: this.props.user.photo}}/>
  //       <Text>{this.props.user.email}</Text>
  //       <Text>{this.props.user.username}</Text>
  //       <Text>{this.props.user.bio}</Text>
  //       <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Edit')}>
  //         <Text style={styles.bold}>Edit Profile</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.button} onPress={() => firebase.auth().signOut()}>
  //         <Text style={styles.bold}>Logout</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }


// follow = (user) => {
//   if(user.followers.indexOf(this.props.user.uid) >= 0){
//     this.props.unfollowUser(user)
//   } else {
//     this.props.followUser(user)
//   }
// }
goToChat = (members) => {
  const uid = members.filter(id => id !== this.props.user.uid)
  console.log('Messages.js before calling chat uid' +uid +" [] => " +uid[0])
  this.props.navigation.navigate('Chat', uid[0])
}

logOutPress = () => {
  firebase.auth().signOut();   // <== This will signout from firebase
  alert('Logged Out');   // <== This will clear the userId from storage
  this.props.navigation.navigate('Login');   // <== We navigate to the loading screen we set earlier, which will check if there is a userId and navigate accordingly 
}

 render() {
  let user = {}
  const { state, navigate } = this.props.navigation
  //alert(state.routeName)
  console.log("Profile: 1. route: " + state.routeName + " props user : " + JSON.stringify(this.props.user))
  if(state.routeName === 'Profile'){
    //user = this.props.user
    user = this.props.profile
    //alert("1" + this.props.profile)
  } else {
    user = this.props.user
    //alert("2"+ JSON.stringify(this.props.user))
  }
//alert("user post " + user.posts)
  //if (!user.posts) return <ActivityIndicator style={styles.container}/>
  //if (!user.posts) 
  console.log("Profile.js before calling chat uid " + this.props.user.uid)
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.space, {paddingHorizontal: 20}]}>
        <View style={styles.center}>
          <Image style={{
          width: 150,
          height: 150,
          borderRadius: 90,
          padding: 1,
          margin: 5,
        }} source={{uri: user.photo}}/>
          <Text>{user.email}</Text>
          <Text>{user.username}</Text>
          <Text>Pet "{user.petname}"</Text>
          <Text>({user.breed})</Text>
          <Text>{user.bio}</Text> 
        </View>
        <View style={styles.center}>
          {/* <Text style={styles.bold}>{user.posts.length}</Text> */}
          {/* <Text>posts</Text> */}
        </View>
        {/* <View style={styles.center}>
          <Text style={styles.bold}>{user.followers.length}</Text>
          <Text>followers</Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.bold}>{user.following.length}</Text>
          <Text>following</Text>
        </View> */}
      </View>
      <View style={styles.center}>
      {
        state.routeName === 'MyProfile' ?
        <View style={[styles.row,styles.space]}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Edit')}>
            <MaterialCommunityIcons style={{marginRight: 30}} name={'account-edit'} size={50} color='#e63b7a'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Activity')}>
            <MaterialCommunityIcons style={{marginLeft:30,marginRight: 30}} name= {'paw'} size={32} color={'#e63b7a'}/>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => this.logOutPress()}>
            <MaterialCommunityIcons style={{marginLeft: 30}} name={'logout'} size={50} color='#e63b7a'/>
          </TouchableOpacity>
        </View> 
        : 
        <View style={styles.row}>
          
          {/* <TouchableOpacity style={styles.buttonSmall} onPress={() => this.follow(user)}>
            <Text style={styles.bold}>{user.followers.indexOf(this.props.user.uid) >= 0 ? 'UnFollow User' : 'Follow User'}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Chat', this.props.profile.uid )}>
            <Text style={styles.textWhite}>Message</Text>
          </TouchableOpacity>
        </View>
      }
      </View>
      
      <FlatList
        style={{paddingTop: 25}}
        horizontal={false}
        numColumns={3}
        data={user.posts}
        keyExtractor={(item) => JSON.stringify(item.date)}
        renderItem={({ item }) => <Image style={styles.squareLarge} source={{uri: item.postPhoto}}/> }
        />
    </View>
  );
}
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getMessages }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile) 



//<TouchableOpacity style={styles.button} onPress={()=> firebase.auth().signOut()}>

//<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Chat', user.uid )}>
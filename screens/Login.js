import React from 'react';
import { Text, View, Image} from 'react-native';
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {updateEmail,updatePassword, login,facebookLogin, getUser} from '../actions/user.js'
import firebase from 'firebase';
import styles from '../styles.js'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


class Login extends React.Component {
    //it force to remain on the home page when
    //the app reloads if is it login
    componentDidMount = () => {

      //checks if the user already login
      firebase.auth().onAuthStateChanged((user) =>{
        if (user) {
          this.props.getUser(user.uid,'LOGIN')
          if(user.uid != null){
           this.props.navigation.navigate('Home')
          }
        }
        
      })
    }

    //login = () => {
    //  this.props.login()
    //  this.props.navigation.navigate('Home')
    //}

  render() {
    return (
      <View style={styles.container}>
      <View style={{marginTop: 64}}>
            <Image 
                  source={require("../assets/logo.png")}
                  style={{resizeMode:"contain",width:300,height:300, alignSelf:"center"}}    
            />
      </View>
      <Text>Login</Text>
        <TextInput
            style={styles.border} //to set input border
            value={this.props.user.email}
            onChangeText={input => this.props.updateEmail(input)}
            placeholder ='Email'
            autoCapitalize = 'none'
        />
        <TextInput
            style={styles.border} //to set input border
            value={this.props.user.password}
            onChangeText={input => this.props.updatePassword(input)}
            placeholder ='Password'
            autoCapitalize = 'none'
            secureTextEntry={true}
        />
        <TouchableOpacity style = {styles.button} onPress={()=> this.props.login()}>
            <Text style={styles.textWhite}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.facebookButton} onPress={()=> this.props.facebookLogin()}>
            <Text style={styles.textWhite}>Facebook Login</Text>
        </TouchableOpacity>

        <Text>OR</Text>
        <Text></Text>
        <TouchableOpacity style = {styles.buttonSignup} onPress={()=> this.props.navigation.navigate('Signup')}>
            <Text>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//redux - global state/variable (passing of variables)
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({updateEmail,updatePassword, login, facebookLogin, getUser},dispatch)
}

const mapStateToProps = (state) => {
    return {
        user:state.user //accessing items in the state else state.user(for user only)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Login) 


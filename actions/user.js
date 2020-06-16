import firebase from 'firebase';
import db from '../config/firebase';
import { orderBy, groupBy, values } from 'lodash'
import * as Facebook from 'expo-facebook';

export const updateEmail = (email) => {
    return {type: 'UPDATE_EMAIL', payload:email}
}
export const updatePassword = (password) => {
    return {type: 'UPDATE_PASSWORD', payload:password}
}
export const updateUsername = (username) => {
    return {type: 'UPDATE_USERNAME', payload:username}
}
export const updatePetname = (petname) => {
    return {type: 'UPDATE_PETNAME', payload:petname}
}

export const updateBreed = (breed) => {
    return {type: 'UPDATE_BREED', payload:breed}
}
export const updateBio = (bio) => {
    return {type: 'UPDATE_BIO', payload:bio}
}
export const updatePhoto = (photo) => {
	return {type: 'UPDATE_PHOTO', payload: photo}
}

//getState (global state)
//must put async to use getState
export const login = () => {
    //use dispatch if not returning value
    return async (dispatch,getState) => {
        try{
           
            const {email,password} = getState().user
            //es7
            const response = await 
            firebase.auth().signInWithEmailAndPassword(email, password)
           
            //dispatch(getUser(response.user.uid))
            //dispatch({type: 'LOGIN', payload:response.user})
            dispatch(getUser(response.user.uid))
        }catch (e) {
            alert(e)
        }
        
    }
}



    export const facebookLogin = () => {
        return async (dispatch) => {
            try{
                Facebook.initializeAsync('555103802016460', 'petsocial');
                const { type, token } = await Facebook.logInWithReadPermissionsAsync('555103802016460')
                if (type === 'success') {
                    
                    // Build Firebase credential with the Facebook access token.
                    const credential = await firebase.auth.FacebookAuthProvider.credential(token);
                
                    // Sign in with credential from the Facebook user.
                    //alert("1 " +  credential)
                    const response = await firebase.auth().signInWithCredential(credential)
                    
                    //alert("2 "+ response.user.uid +' \n '+ response.user.email +' \n '+ response.user.displayName +' \n '+ response.user.photoURL)
                    
                    const user = await db.collection('users').doc(response.user.uid).get();
                   
                    
                    if(!user.exists){
                        const user = {
                            uid:response.user.uid,
                            email: response.user.email,
                            username:response.user.displayName,
                            username:'',
                            breed:'',
                            bio:'',
                            photo: response.user.photoURL,
                            token:null //use for notification
                        }
                        db.collection('users').doc(response.user.uid).set(user) //initialize firestore
                
                        dispatch({type:'LOGIN',payload:user})
                    } else {
                           dispatch(getUser(response.user.uid))
                    }
                }
            }catch (e) {
                alert(e)
            }
            
        }
    }

//use to get user's other information
// export const getUser = (uid,) => {
// 	return async (dispatch, getState) => {
// 		try {
//             const user = await db.collection('users').doc(uid).get()
// 			dispatch({type: 'LOGIN', payload: user.data()})
// 		} catch (e) {
// 			alert(e)
// 		}
// 	}
// }

// export const getUser = (uid,type) => {
// 	return async (dispatch, getState) => {
// 		try {
//             const user = await db.collection('users').doc(uid).get()
//             if (type === 'LOGIN') {
//                 dispatch({type: 'LOGIN', payload: user.data()})
//             } else {
//                 dispatch({type: 'GET_PROFILE', payload: user.data()})
//             }
			
// 		} catch (e) {
// 			alert(e)
// 		}
// 	}
// }

export const getUser = (uid,type) => {
	return async (dispatch, getState) => {
		try {
            //const user = await db.collection('users').doc(uid).get()
            const userQuery = await db.collection('users').doc(uid).get()
            user = userQuery.data()

            let posts = []
            const postsQuery = await db.collection('posts').where('uid', '==', uid).get()
            postsQuery.forEach(function(response) {
                posts.push(response.data())
            })
            //enable april 15, 2020
            user.posts = orderBy(posts, 'date','desc')
            

            if (type === 'LOGIN') {
                dispatch({type: 'LOGIN', payload: user})
            } else {
                dispatch({type: 'GET_PROFILE', payload: user})
            }
			
		} catch (e) {
			alert(e)
		}
	}
}




export const updateUser = () => {
    return async ( dispatch, getState )  => {
      const { uid, username, bio, photo,petname,breed } = getState().user
      try {
        db.collection('users').doc(uid).update({
          username: username,
          bio: bio,
          petname:petname,
          breed:breed,
          photo: photo
        })
      } catch(e) {
        alert(e)
      }
    }
  }



export const signup = () => {
    //use dispatch if not returning value
    return async (dispatch,getState) => {
        try{
            const {email,password,username,petname,breed,bio} = getState().user
            //es7
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            dispatch({type: 'LOGIN', payload:response.user})
            if (response.user.uid) {
                const user = {
                    uid:response.user.uid,
                    email: email,
                    username:username,
                    petname:petname,
                    breed:breed,
                    bio:bio,
                    photo: '',
                    token:null //use for notification
                }
                db.collection('users').doc(response.user.uid).set(user) //initialize firestore
                dispatch({type:'SIGNUP',payload:response.user})
            }
        }catch (e) {
            alert(e)
        }
        
    }
}

//promise
            //firebase.auth().signInWithEmailAndPassword(this.props.user.email, this.props.user.password)
            //.then(function(){
            //    console.log('success')
            //})
            //.catch(function(error) {
            //    alert(error)
            //  });
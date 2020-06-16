import firebase from 'firebase';
import db from '../config/firebase';
import uuid from 'uuid'
import cloneDeep from 'lodash/cloneDeep'
import { orderBy, groupBy, values } from 'lodash'

export const updateDescription = (text) => {
    return {type: 'UPDATE_DESCRIPTION', payload: text}
}

export const updateCategory = (text) => {
    return {type: 'UPDATE_CATEGORY', payload: text}
}

export const updateLocation = (input) => {
    return {type: 'UPDATE_LOCATION', payload: input}
}

export const updatePhoto = (input) => {
    return {type: 'UPDATE_POST_PHOTO', payload: input}
}

//use to get user's post
export const uploadPost = () => {
	return async (dispatch, getState) => {
		try {
            const {post,user} = getState()
            console.log(post)

            //props variables: postPhoto,postDescription,uid,photo, username
           
            const upload = {
               postPhoto:post.postPhoto,
               category: post.category.category,
               postDescription: post.description || ' ',
               postDate: new Date().getTime(),
               uid: user.uid,
               photo:user.photo || ' ',
               username: user.username,
               postLocation: post.location || ' ',
               likes: [],
               comments: []
            }
            
            //call data firestore document 'posts'
            //const post = await db.collection('posts').doc(uid).get() <-- not using uid because it will overwriting you post
            //we will post by a unique id per photo not by user id but still reference it to user id
            
            //get collection from document/table 'posts' (firebase/firestore)
            const ref = await db.collection('posts').doc()
            // assigning a unique id (posts id) to upload
           
            upload.id = ref.id
            ref.set(upload) //creating/uploadding posts document to firestore
           
            //dispatch({type: 'LOGIN', payload: upload.data()})
		} catch (e) {
			alert(e)
		}
	}
}


//use to get user's other information
export const getPosts = (option) => {
	return async (dispatch) => {
		try {
            //retrieving all post by specific user id from firestore document 'posts'
            //const posts = await db.collection('posts').doc(uid).get()

            //retrieving all post fro mall users from firestore document 'posts'
            let posts;
            if (option=='Home') {
                posts = await db.collection('posts').get()
            } else {
                posts = await db.collection('posts').where("category","==",option).get()
            }
            
            console.log(posts)
            
            let array = []
            posts.forEach((post) => {
                array.push(post.data())
            })
            console.log(array)
			dispatch({type: 'GET_POSTS', payload: orderBy(array,'postDate','desc')})
		} catch (e) {
			alert(e)
		}
	}
}

//like post with passing of post as reference
export const likePost = (post) => {
    return (dispatch, getState) => {
        //const {uid} =getState().user
        //added username, photo for the current user for activity march 27 11:00am
        const {uid,username, photo} =getState().user
       
        try {
            // use clonedeep to avoid getting extra api for post feed
            //added march 27 11:00am
            const home = cloneDeep(getState().post.feed)
            let newFeed = home.map( item => {
                if(item.id === post.id ){
                    item.likes.push(uid)
                }
                return item
            })

            db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(uid)
            })

            //activity added march 27 11:00am
            db.collection('activity').doc().set({
                postId: post.id,
                postPhoto: post.postPhoto,
                likerId: uid,
                likerPhoto: photo,
                likerName: username,
                uid: post.uid,
                date: new Date().getTime(),
                type: 'LIKE'
            })

             // use clonedeep to avoid getting extra api for post feed
            //added march 27 11:00am
            dispatch({type:'GET_POSTS', payload: newFeed})
            //replace by clonedeep dispatch typpe: 'GET_POSTS' march 27 11:00am
            //dispatch(getPosts(post.category))
        } catch (e) {
            console.error(e)
        }
    }
}

export const unlikePost = (post) => {
    return async (dispatch, getState) => {
        const {uid} =getState().user
        try {
            db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(uid)
            })

            //activity added march 27 11:00am 
            const query = await db.collection('activity').where('postId', '==', post.id).where('likerId', '==', uid).get()
            query.forEach((response) => {
                response.ref.delete()
            })

            dispatch(getPosts(post.category))
        } catch (e) {
            console.error(e)
        }
    }
}

export const getComments = (post) => {
    return dispatch => {
        //console.log("post.js getComments:> " + JSON.stringify(post.comments))
      dispatch({ type: 'GET_COMMENTS', payload: orderBy(post.comments, 'date','desc') })
    }
  }
  

export const addComment = (text, post) => {
    return (dispatch, getState) => {
      const { uid, photo, username } = getState().user
      // to use clone deep for only add current comment to photo comments 
      // no waiting to reload for display all comments(current comment)
      // using let to add/modify variable
      let comments = cloneDeep(getState().post.comments.reverse())
      try {
        const comment = {
          comment: text,
          commenterId: uid,
          commenterPhoto: photo || '',
          commenterName: username,
          date: new Date().getTime(),
        }
        console.log(comment)
        db.collection('posts').doc(post.id).update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment)
        })
    
        // this is to add data for activity data collection
        comment.postId = post.id
        comment.postPhoto = post.postPhoto
        comment.uid = post.uid
        comment.type = 'COMMENT'
        comments.push(comment)
        dispatch({ type: 'GET_COMMENTS', payload: comments.reverse() })

        db.collection('activity').doc().set(comment)
      } catch(e) {
        console.error(e)
      }
    }
  }
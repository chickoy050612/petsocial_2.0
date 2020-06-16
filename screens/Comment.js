import React, { Component } from 'react';
import { Text, View, TextInput, FlatList,  KeyboardAvoidingView, Image } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addComment, getComments } from '../actions/post'
import moment from 'moment'


class Comment extends Component {
  
    state ={
        comment: ''
    }

    componentDidMount = () => {
        const { params } = this.props.navigation.state
        console.log("comment.js 1. state "+JSON.stringify(params))
        this.props.getComments(params)
      }
    

    postComment = () => {
        //this.props.navigation.state <-- parameter(post) send from home pages comment icon press
        const { params } = this.props.navigation.state
        this.props.addComment(this.state.comment, params)
        this.setState({comment: ''})
    }

    render() {
        return (
            <View style={styles.container}>
            {/* displays long comments by avoiding keyboard */}
                <KeyboardAvoidingView enabled behavior='padding' style={styles.container}> 
                <FlatList 
                    data={this.props.post.comments}
                    keyExtractor = {(item) => JSON.stringify(item.date)}
                    renderItem={({ item })=>(
                    <View style={[styles.row, styles.center]}>
                        <Image style={styles.roundImage} source={{uri: item.commenterPhoto}}/> 
                        <View>
                            <Text >{item.commenterName}</Text>
                            <Text >{item.comment}</Text>
                        </View>
                    </View>
                    )}
                />

                {/* <Text>{this.state.comment}</Text> */}
                <TextInput 
                    style={styles.input}
                    onChangeText={(comment) =>this.setState({comment})}
                    value = {this.state.comment}
                    returnKeyType='send'
                    placeholder='Add Comment'
                    onSubmitEditing={this.postComment}/>
                </KeyboardAvoidingView>
                
            </View>
        );
    }

}



const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addComment,getComments}, dispatch)
}

const mapStateToProps = (state) => {
    return { 
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
import React from 'react';
import { Text, View, Button, Image} from 'react-native';
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {getPosts} from '../actions/post'
import styles from '../styles.js'
import { ScrollView } from 'react-native-gesture-handler';


class Home extends React.Component {

  //if mount load feed
  componentDidMount(){
    this.props.getPosts()
  }

  //rendering image from post array
  render() {
    if (this.props.post === null) return null
    return (
      <View>
        <ScrollView>
          {this.props.post.feed.map((post)=>{
            return(
                <View>
                  <Image style= {styles.postPhoto} source = {{uri: this.props.post.feed.postPhoto}}/> 
                  <Text>{this.props.post.feed[0].postDescription}</Text>
                </View>
            )
          })}
        </ScrollView>
      </View>
    );
  }
  
}

//redux - global state/variable (passing of variables)
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({getPosts},dispatch)
}

const mapStateToProps = (state) => {
    return {
        post:state.post //from redux
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Home) 

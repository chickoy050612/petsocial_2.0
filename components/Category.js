import React, {Component, useState,useEffect, useReducer} from "react";
import {View, Text, Image} from "react-native"
import { TouchableOpacity} from 'react-native-gesture-handler';

import {getPosts,updateCategory} from '../actions/post.js'
import {bindActionCreators } from 'redux'
import {connect} from 'react-redux'


class Category extends Component {
    
    //   refresh (item) {
    //       //alert(item)
    //     //this.props.updateCategory(item)

    //     //to refresh home feed
    //     //getPost(item)
    //     this.props.getPosts(item)
       
    //   }

    render () {
        return (
            <View style= {{height:130, width: 130,marginLeft:20,
            borderWidth:0.5, borderColor:'#FFF'}}>
                <View style={{flex:2}}>
                    <TouchableOpacity onPress={()=>{
                        this.props.getPosts(this.props.name);
                        //alert("categ on press");
                        this.props.updateCategory(this.props.name)
                        }}>
                        <Image source={this.props.imageUri}
                            style={{width:"100%", height:"100%", borderRadius:10}}
                        />
                    </TouchableOpacity>
                </View>
                
                <View style={{flex:1, paddingLeft:10, paddingTop:10}}>
                            <Text style={{color:'#e63b7a'}}  >{this.props.name}</Text>
                </View>
            </View>
        )
    }
}

{/* <Image source={this.props.imageUri}
style={{flex:1,width:null, height:null,
resizeMode:'cover', borderRadius:10}}
/> */}

//<TouchableOpacity onPress={()=>this.props.getPosts(this.props.name) } ></TouchableOpacity>

//export default Category;


//redux - global state/variable (passing of variables)

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({getPosts,updateCategory},dispatch)
}

const mapStateToProps = (state) => {
    return {
        post:state.post //from redux
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Category) 


{/* <TouchableOpacity onPress={()=>this.refresh(this.props.name)}>
    <Image source={this.props.imageUri}
        style={{width:"100%", height:"100%", borderRadius:10}}
    />
</TouchableOpacity> */}
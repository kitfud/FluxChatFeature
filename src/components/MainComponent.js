import React, {Component} from 'react'
import Home from './HomeComponent.js';
import About from './AboutComponent.js';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Chat from './ChatComponent';
import MapExample from './MapComponent'

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { toggleTimer,upComment,downComment,fetchSlides, googleLogin,logoutUser, deleteComment,postComment,fetchComments } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
    fetchSlides: ()=>dispatch(fetchSlides()),

    googleLogin: () => dispatch(googleLogin()),
    logoutUser: () => dispatch(logoutUser()),

    postComment: (author, comment) => dispatch(postComment(author, comment)),
    fetchComments: () => dispatch(fetchComments()),
    deleteComment: (commentId)=>dispatch(deleteComment(commentId)),
    upComment:(commentId)=>dispatch(upComment(commentId)),
    downComment:(commentId)=>dispatch(downComment(commentId)),
    toggleTimer:(commentId)=>dispatch(toggleTimer(commentId))

})

const mapStateToProps = state =>{
    return{
        slides: state.slides,
        auth: state.auth,
        comments: state.comments.comments
    }
}


class Main extends Component {

componentDidMount(){
    this.props.fetchSlides();
    this.props.fetchComments();
}

    render(){
        return(
<React.Fragment>
<Header googleLogin ={this.props.googleLogin}
  auth={this.props.auth} 
  
  logoutUser={this.props.logoutUser}
/>

<Switch>
<Route path='/home' component={() =><Home slides={this.props.slides} />} />
<Route path='/about' component={About} />
<Route path='/map' component= {MapExample} />
<Route path='/chat' component={()=><Chat user={this.props.auth.user ? this.props.auth.user.displayName : "Login to submit a comment! "} authenticate={this.props.auth}
postComment = {this.props.postComment}
comments = {this.props.comments}
deleteComment ={this.props.deleteComment}
upComment = {this.props.upComment}
downComment = {this.props.downComment}
toggleTimer = {this.props.toggleTimer}
/>}/>

<Redirect to="/home" />
</Switch>

<Footer/>
</React.Fragment>            

        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
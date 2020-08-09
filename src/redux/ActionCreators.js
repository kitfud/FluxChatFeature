import * as ActionTypes from './ActionTypes';
import {SLIDES} from '../shared/slides';
import { auth, firestore, fireauth, firebasestore} from '../firebase/firebase';


export const fetchSlides = () => (dispatch) => {

    dispatch(slidesLoading(true));

    setTimeout(() => {
        dispatch(addSlides(SLIDES));
    }, 2000);
}

export const slidesLoading = () => ({
    type: ActionTypes.SLIDES_LOADING
});

export const slidesFailed = (errmess) => ({
    type: ActionTypes.SLIDES_FAILED,
    payload: errmess
});

export const addSlides = (slides) => ({
    type: ActionTypes.ADD_SLIDES,
    payload: slides
});


export const googleLogin = () => (dispatch) => {
    
    const provider = new fireauth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(async (result) => {
            var user = result.user;
            try {
            const snapshot = await firestore.collection('users').where('user', '==', user.displayName).get();
            var id = [];
            snapshot.forEach(doc => {
                //const data = doc.data()
                const item = doc.id;
                id.push(item);
                //console.log("document data:"+ JSON.stringify(data))
                //console.log("id:"+ JSON.stringify(id))
            });
            const id_1 = id;
            //id[0] is the first document to turn up with criteria for update
            if(id_1[0]){
                firestore.collection('users').doc(id_1[0]).get()
            
                .then(()=>{
                    return firestore.collection('users').doc(id_1[0]).update({
                        loginAt: firebasestore.FieldValue.serverTimestamp(),
                    })
                })
               
                .catch((error) => { console.log("error on getting doc"); })  
            }
            else {
                return firestore.collection('users').add({
                    user: user.displayName,
                    loginAt: firebasestore.FieldValue.serverTimestamp(),
                    updates: false
                });
            }

        }
        catch (error_1) {
            return dispatch(loginError(error_1.message));
        }   
     //console.log(JSON.stringify(user))
     localStorage.setItem('user', JSON.stringify(user));
     //Dispatch the success action
    
     dispatch(receiveLogin(user));
        
       
    }
        )
    
}

export const requestLogin = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
}
  
export const receiveLogin = (user) => {
    
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        user
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}


export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    auth.signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    localStorage.removeItem('user');

    dispatch(receiveLogout())
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
    
});

export const deleteComment = (comment) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        alert("login to delete comments")
        return;
    }

    var user = auth.currentUser;
    //console.log(user.email)
    //console.log(user.displayName)
  

    return firestore.collection('comments').get()
    .then(snapshot => {
        //console.log(comment.author.firstname);
    
            if(auth.currentUser.uid === comment.author._id || user.email=== comment.author.firstname){
            firestore.collection('comments').doc(comment._id).delete()
            .then(() => {
                dispatch(fetchComments());
            })
            }
            else
            {alert('can only delete your own comments')}
            
            
        
    })
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const postComment = (comment,author) => (dispatch) => {

    //alert("plant owner: "+ plantOwner)
    
      if (!auth.currentUser) {
          console.log('No user logged in!');
          return;
      }
    
      return firestore.collection('comments').add({
          author: {
              '_id': auth.currentUser.uid,
              'firstname' : author
          },
          comment: comment,
          startTimer:true,
          createdAt: firebasestore.FieldValue.serverTimestamp(),
          updatedAt: firebasestore.FieldValue.serverTimestamp()
      })
      .then(docRef => {
          firestore.collection('comments').doc(docRef.id).get()
              .then(doc => {
                  if (doc.exists) {
                      const data = doc.data();
                      const _id = doc.id;
                      let comment = {_id, ...data};
                      dispatch(addComment(comment))
                     
                  } else {
                      // doc.data() will be undefined in this case
                      console.log("No such document!");
                  }
              });
      })
      .catch(error => { console.log('Post comments ', error.message);
          alert('Your comment could not be posted\nError: '+ error.message); })
    
    .then(()=>{
        //added to kick of the state change listener for user updates, on main component
        dispatch(fetchComments())
    })
       
    }

    export const fetchComments = () => (dispatch) => {    
        return firestore.collection('comments').get()
        .then(snapshot => {
            let comments = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                comments.push({_id, ...data });
            });
            return comments;
        })
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
      };

      export const upComment = (comment)=>(dispatch)=>{
     
    
        return firestore.collection('comments').get()
        .then(snapshot => {
            //console.log(comment.author.firstname);
        
                firestore.collection('comments').doc(comment._id).update({
                    thumbsUp:firebasestore.FieldValue.increment(1)
                })
                
                .then(() => {
                    dispatch(fetchComments());
                })       
            
        })
        .catch(error => dispatch(commentsFailed(error.message)));
      }

      export const downComment = (comment)=>(dispatch)=>{
     
    
        return firestore.collection('comments').get()
        .then(snapshot => {
            //console.log(comment.author.firstname);
        
                firestore.collection('comments').doc(comment._id).update({
                    thumbsDown:firebasestore.FieldValue.increment(1)
                })
                
                .then(() => {
                    dispatch(fetchComments());
                })       
            
        })
        .catch(error => dispatch(commentsFailed(error.message)));
      }

      export const toggleTimer = ()=>(dispatch)=>{
        console.log("TOGGLE TIMER!")
        return firestore.collection('comments').get()
        .then(
            function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.update({
                        startTimer: false
                    });
                });
            }    
        )
        .then(()=>
        dispatch(fetchComments()))
        .catch(error => dispatch(commentsFailed(error.message)));
      }
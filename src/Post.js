import React ,{ useState, useEffect } from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';
import firebase from 'firebase';

//user is the signed in user below
function Post({ postId, user, username, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
// now crt a new placeholder for comt input inital it is empty

    useEffect(()=> {
        let unsubscribe;
        // if a post id is passed then unsubscribe in db wer accesing the post 
        // collection ..going to the postid documnt .. into thr collections
        //inside comments collection go get a snapshot of that
        //snapshot listner for comments (powrful-nested listner)
        if (postId){
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }

        return () => {
            unsubscribe();
        };
    },[postId]);
    // we need to consider the variabl dependency ,if that variable changes it 
    //refiles it

    const postComment = (event) =>{
        event.preventDefault();
  //now we go in to the db
        db.collection("posts").doc(postId).collection("comments").add({
  // here we go to add the key value pair
            text: comment,
            username: user.displayName,
    //here we actualy need the user who looged in so that he on;y commented
    //go to the post and pass the user who looged in app.js
             timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
        // it is to clear the box aftr commenting
    }

// function to submit the comment inside the database |^|

    return (
        <div className="Post">
          <div className="Post__header">
          <Avatar
                className="Post__avatar"
                alt='46_kevin'
                src="/static/images/avatar/1.jpg"/>
                <h3>{username}</h3>
          </div>
            
            {/* { Header -> avatar ->username} */}
            <img className="Post__image" src={imageUrl} alt="s"/>
            {/* { image} */}
            <h4 className="Post__text"><strong>{username}</strong> {caption}</h4>
            
                {/* { username + caption} */}

        
        <div className="post__comments">
            {
                comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
        </div>

        {user && (
                <form className="post__commentBox">
                {/* here we r having to inputs */}
                <input 
                        className="post__input"
                        type="text"
                        placeholder="Add a comnt .._..  sbb   :)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                />
    
                <button
                        
                        className="post__button"
                        disabled={!comment}
                // if there is no comment then disable the post button
                        type="submit"
                        onClick={postComment}
                        // inside it is a functn to post the comment
                        >
                            Post
                        </button>
            </form>
        )}

        </div>
    )
}

export default Post


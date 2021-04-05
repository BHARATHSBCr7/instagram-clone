import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import firebase from "firebase";
import { storage, db } from "./firebase";
import './ImageUpload.css';

function ImageUpload({username}) {
    const [image, setImage] = useState('');
    // const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [caption,setCaption] = useState('');

    const handleChange = (e) => {
    if (e.target.files[0]){
        setImage(e.target.files[0]);
        // here we need to take the first file that e]
        // we upload (multiple fikes can be chosen)
    }
    };

    const handleUpload = () =>{
      
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        // get a refrnc acces to storage in firebase get refrnc to it we creat new photo
        // and upload it here store it 
        // image.name is the file name of which we selected and put the image

        uploadTask.on(
            "state_changed",
            (snapshot) =>{
                // progress function .... it will show the speed of upload
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // error functio -_-
                console.log(error);
                alert(error.message);
            },
           
            () => {
                 // complete function
                 storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    // go an get a download link now
                    .then(url => {
                        // post the image inside a data base
                        db.collection("posts").add({
                            // based on the servwr were our code is living
                            // saw all hthe psosts with crct timing
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            //go and get the  timestamp which is exactly on the server
                            //any image uploaded will show om the top
                            //we are using firebase timer so location is independent 
                            // it will give some ubify time 
                            caption: caption,
                            imageUrl: url,
                             // it is literly the download url
                            //uploaded to firebase and it give use a firebase link 
                            // that link is pused to pop up a post
                            username: username
                            // we have it on app.js so go back to app.js
                           
                        });

                // now we are setting back everythin to its original stage
                            setProgress(0);
                            setCaption("");
                            setImage(null);
                    });

                    // after uploading the image to firebase ..to get that url 
                    // and do something withit we need to get the download url that is 
                // oncle it get uploaded it will give a download url...
            }
        );  
    };

    return (
        <div className="imageupload">
        {/* <h1>abc</h1> */}

        {/* i want to have a caption(comment) */}
        {/* i want 2 have caption input */}
        {/* file picker to pick an image */}
        {/* post button  */}
      
        <progress className="imageupload__progress" value={progress} max="100" />
        <input type="text" placeholder="Enter a caption.._" onChange={event => setCaption(event.target.value)} value={caption}/>
                                        {/* when we type a new comment set the captio n to event to tRGEt to value */}
                                        {/* we now created a refrence of what image we are going 2 upload */}
        <input type="file" onChange={handleChange} />
        <Button 
        // className="imageupload__button" 
        onClick={handleUpload}>
            Upload
        </Button>

        </div>
    )
}

//     const db = firebaseApp.firestore();
//     const auth = firebase.auth();
//     const storage = firebase.storage();

// export { db, auth, storage };
export default ImageUpload


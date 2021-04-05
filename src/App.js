import React, { useState,useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
      const classes=useStyles();
      const [modalStyle]=useState(getModalStyle);
       const [posts, setPosts] =useState([
      //   {
      //     username: "sivungi",
      //    caption: "i can drink more water",
      //     imageUrl: "https://i.ibb.co/7pnfPy7/download-1.png"
      //   },
      //   {
      //     username: "sivungi",
      //    caption: "i can drink more water",
      //     imageUrl: "https://i.ibb.co/7pnfPy7/download-1.png"
      //   },
        ]);
        const [open,setOpen]=useState(false);
        const [openSignIn, setOpenSignIn] = useState(false);
        
      // const Posts=[]; the above line is equal to it
      // setPosts([we can pas whatever value in it]);
    // UseEffect -> runs a piece of code based on a specific condition
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [email, setEmail]=useState('');
    const [user, setUser]= useState(null);

    useEffect( () => {
      const unsubscribe = auth.onAuthStateChanged((authUser) =>{
        if(authUser){
          // user has logged in....
          console.log(authUser);
          setUser(authUser);// it keeps us login while we refresh it ..

          // we changed the authentication
          // if (authUser.displayName){
          //     // if user name is already created dont update them
          // }else{
          //       // if we just created someone store it on firebase

          //   return authUser.updateProfile({
          //     displayName: username,
          //   });
          // }

        }
        
        else{
          // the user has logged out..
          setUser(null);
        }
      })

      return () => {
        // perform some  cleanup actions
        unsubscribe();
      }
    }, [user, username]);
      
    useEffect(() => {
        //  this is wjere our code runs
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
          // every single time a new post is added this code takes the snapshot
          // set that post into something that is inside it from snapshot go get the 
          // doc so tthe list of simple thinfs and map through every singlr ones
          // and get each doc like loop more than that (loop)
          setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()  // creating an object of having key(id) and value(data)
          })));
        })
       }, []);

      const signUp = (event) =>{
          event.preventDefault();

          auth
          .createUserWithEmailAndPassword(email, password)
          .then((authUser) => {
           return authUser.user.updateProfile({
              displayName: username
            })
          })
          .catch((error) => alert(error.message));

          // afterv we sign in  or signup we dont wanr this model (pop up) to open so close it
          setOpen(false);
      } 

      const signIn = (event) => {
        event.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))
        
            // afte r this we need to close the model (pop up) so ..

        setOpenSignIn(false);
      }

       return (
    <div className="app">     

        {/* i want to have a caption(comment) */}
        {/* i want 2 have caption input */}
        {/* file picker to pick an image */}
        {/* post button  refer imageupload.js*/}

        

  <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
       <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
        <center>
      <img 
    className="app__headerImage"
    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
    alt=""
    />
    </center>

    <Input
    placeholder="username"
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    />
    <Input
    placeholder="email"
    type="text"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
    <Input
    placeholder="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
    <Button type="submit" onClick={signUp}>Sign Up</Button>
        </form>  
      
</div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
       <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
        <center>
      <img 
    className="app__headerImage"
    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
    alt=""
    />
    
    </center>
    <Input
    placeholder="email"
    type="text"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
    <Input
    placeholder="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
    <Button type="submit" onClick={signIn}>Sign In</Button>
        </form>  
      
</div>
      </Modal>

        {/* surrounding container is app header */}
        
      <div className="app__header"> 
    <img 
    className="app__headerImage"
    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
    alt=""
    />

{user ?(
          <Button onClick={() =>auth.signOut()}>LogOut</Button>
        ) :(
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In </Button>
            <Button onClick={() => setOpen(true)}>Sign Up </Button>

          </div>
      )}

    </div>

   <div className="app__posts">

     <div className="app__postsLeft">

     {
  posts.map(({id, post}) => (
    <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
    // now duplicate post are left and new onse got renderd
    //from here pass the username as user to post.js for comment session
  ))
    }

     </div>
  
    <div className="app__postsRight">


    {/* {
  posts.map(({id, post}) => (
    <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
    // now duplicate post are left and new onse got renderd
  ))
    } */}


    <InstagramEmbed
   
    url='https://www.instagram.com/p/Zw9o4/'
    // clientAccessToken='123|456'
    maxWidth={320}
    hideCaption={false}
    containerTagName='div'
    protocol=''
    injectScript
    onLoading={() => {}}
    onSuccess={() => {}}
    onAfterRender={() => {}}
    onFailure={() => {}}
/>

    </div>

   </div>

   

   {/* div.app__posts  */}

  
   

    {/* <h1>HELLO SBB THIS IS INSTAgg</h1> */} 

    {/* <Post username="46_kevin_sbb_cr7" caption="its all about sun" imageUrl="https://i.ibb.co/XSy5ZRK/Screenshot-2021-03-28-11-27-30-750-com-google-android-youtube.jpg"/> */}
    
 
      {/* hard coding */}
    {/* <Post username="sivungi" caption="i can drink more water" imageUrl="https://i.ibb.co/7pnfPy7/download-1.png"/> */}
    {/* <Post username="46_kevin_sbb_cr7" caption="its all about sun" imageUrl="https://i.ibb.co/XSy5ZRK/Screenshot-2021-03-28-11-27-30-750-com-google-android-youtube.jpg"/> */}
    {/* <Post username="gan" caption="myself godzila" /> */}
    {/* <Post /> */}

   {/*Header*/}
    {/*posts*/}
{/* below line we use ? like if name is there then do it
        like if name is not there di=ont do anythin rather than that
        normaly we need try catch for it */}
           

           {user?.displayName ? (
        /* now here we dont want to render the username unless the user signedin */
        /* we are accesing the property which might not be there */
        <ImageUpload username={user.displayName} />
        ): (
          <h3>Sorry you need to login to Uploadd</h3>
        )
      } 
       
        {/* aim is to just render out impage upload here  */}



    </div>
  );
}

export default App;

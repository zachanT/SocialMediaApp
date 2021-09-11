import {useState, useEffect} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route } from "react-router-dom"

import './App.css';
import Login from './components/Login';
import Newpost from './components/Newpost.js'
import Posts from './components/Posts.js'
import Sidebar from './components/Sidebar'
import Signup from './components/Signup'
import Nav from './components/Nav'

/* useEffect(fn(), []) expects a function that is the sideeffect and an array of dependent state variables. The function 
will be called everytime one of the dependent variables' value gets updated
*/ 

/*
  I guess just have a function here to pull data from the database and load it into the state.
  
  const accounts = [{
    id: _,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    posts: [],
    following: [],
    followers: [],
    profilePic: '',
  }]
*/

const _posts = [{
  postId: 0,
  poster: "John Smith",
  post: "I am so awesome!",
  date: "08-31-2021",
  likes: 0,
  comments: []
},
{
  postId: 1,
  poster: "Joe Ma",
  post: "we do a little trolling",
  date: "08-31-2021",
  likes: 0,
  comments: []
}
]

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/')
        .then(response => {
          if(response.data.length > 0) {
            setPosts(response.data)
          } else {
            setPosts([])
          }
          
          console.log(posts)
        })
        .catch((err) => {
          console.log(err);
        })
  }, [])
  
  var postCount = posts.length;

  /* Creates a new post when the post button is clicked */
  const handleNewPost = (text) => {
    const d = new Date();
    const _date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    const post = {
      postId: postCount++,
      poster: "My Name",
      post: text,
      date: _date,
      likes: 0,
      comments: [],
    }

    setPosts([...posts, post]);
    axios.post('http://localhost:5000/add', post)
      .then(res => {
        // All the state stuff is in the component...

      })
      .catch(err => {
        console.log("Error " + err);
      })
  }

  /* Function to handle when the like button is pressed on a post */
  const handleLike = (ind) => {
    let _posts = posts.slice();
    _posts[ind].likes++;
    setPosts(_posts);
  }

  /* Adds a comment to a post when the comment button is clicked */
  const handleComment = (ind, comment) => {
    let _posts = posts.slice();
    const d = new Date();
    const _date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    const newComment = {
      id: _posts[ind].comments.length+1,
      commentor: "My Name",
      comment: comment,
      date: _date,
    }
    _posts[ind].comments = [..._posts[ind].comments, newComment]
    setPosts(_posts);
  }

  return (
    <Router>
      <div className="App">
        <Route path='/'>
          <Nav />
          <div className="main">
            <Sidebar />
            <div className="content">
              <Newpost onSubmit={handleNewPost}/>
              {posts.length > 0 ? (
                <Posts 
                  posts={posts}
                  clickLike={handleLike}
                  clickComment={handleComment}
                />
              ) : (
                'No posts, follow someone to see posts'
              )}
            </div>
          </div>
        </Route>

        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/signup'>
          <Signup />
        </Route>
      </div>
    </Router>
  );
}

export default App;

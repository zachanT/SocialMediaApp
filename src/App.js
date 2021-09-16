import {useState, useEffect} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import './App.css';
import Login from './components/Login';
import Newpost from './components/Newpost.js'
import Posts from './components/Posts.js'
import Sidebar from './components/Sidebar'
import Nav from './components/Nav'

/* 
  My current implementation of Google Login is 100% not secure, like at all. Anyone can just create a user object and 
  store it in localStorage. Would need to verify, I think handling this in the backend is a more secure solution,
  not sure how you would normally do it... 
*/ 

const App = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [formData, setFormData] = useState({name: '', email: '', password: ''})

  console.log(user)

  useEffect(() => {
    axios.get('http://localhost:5000/post/')
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

  useEffect(() => {
    const token = user?.token

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [])
  
  var postCount = posts.length;

  /* Creates a new post when the post button is clicked */
  const handleNewPost = (text) => {
    const d = new Date();
    const _date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    const post = {
      posterId: user._id,
      posterName: user.name,
      posterPic: user.profilePic,
      //postId: postCount++,
      post: text,
      date: _date,
      likes: 0,
      comments: [],
    }

    setPosts([...posts, post]);
    axios.post('http://localhost:5000/post/add/', post)
      .then(res => {
        // All the state stuff is in the component...
        console.log(res)
      })
      .catch(err => {
        console.log("Error " + err);
      })
  }

  /* Function to handle when the like button is pressed on a post */
  const handleLike = (ind, postId) => {
    let _posts = posts.slice();
    _posts[ind].likes++;
    setPosts(_posts);

    // Add logic so that you can only like a post once
    axios.post('http://localhost:5000/post/update/' + postId, _posts[ind])
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log("Error: " + err);
      })
  }

  /* Adds a comment to a post when the comment button is clicked */
  const handleComment = (ind, postId, comment) => {
    let _posts = posts.slice();
    const d = new Date();
    const _date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    const newComment = {
      id: _posts[ind].comments.length+1,
      commenter: user.name,
      commenterPic: user.profilePic,
      comment: comment,
      date: _date,
      likes: 0,
    }
    _posts[ind].comments = [..._posts[ind].comments, newComment]
    console.log(newComment)
    console.log(_posts[ind])
    setPosts(_posts);

    axios.post('http://localhost:5000/post/update/' + postId, _posts[ind])
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log("Error: " + err)
      })
  }

  return (
    <Router>
      <div className="App">
        <Switch>          
        <Route exact path='/login'>
          <Login />
        </Route>
        {user ? (
          <Route exact path='/'>
            <Nav name={user.name}/>
            <div className="main">
              <Sidebar />
              <div className="content">
                <Newpost onSubmit={handleNewPost} user={user} />
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
          ) : (
          <div>
              <Redirect to='/login' />
          </div>
        )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

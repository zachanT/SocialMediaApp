import {useState} from "react";
import { Avatar, Button, Paper } from "@material-ui/core"
import yellow from "@material-ui/core"

const Newpost = ({ onSubmit, user }) => {
    const [postValue, setPostValue] = useState("");

    const handleChange = (e) => {
        setPostValue(e.target.value);
    }

    const handleNewPost = async (e) => {
        e.preventDefault();
        await onSubmit(postValue);
        setPostValue("")
    }

    return (
        <div className='newPost'>
            <Avatar src={user.profilePic} alt={user.name} />
            <form className='newPostForm' onSubmit={handleNewPost}>
                <input id='newPostText' type='text' placeholder="What's on your mind?" value={postValue} onChange={handleChange}></input>
                
                <button>Add Photo</button>
                <Button type='submit' className='btn_post'>Post</Button>
            </form>
        </div>
    )
}

export default Newpost

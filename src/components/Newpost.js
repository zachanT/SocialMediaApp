import {useState} from "react";

const Newpost = ({ onSubmit }) => {
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
            <form className='newPostForm' onSubmit={handleNewPost}>         
                <img alt='null'></img>
                <input type='text' placeholder='Name' /> <br />
                <input id='newPostText' type='text' placeholder="What's on your mind?" value={postValue} onChange={handleChange}></input>
                <br/>
                <button>Add Photo</button>
                <input type='submit' value='Post' />
            </form>
        </div>
    )
}

export default Newpost

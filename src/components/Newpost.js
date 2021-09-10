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
        <div>
            <form className='newPostForm' onSubmit={handleNewPost}>
                <input type='text' placeholder="What's on your mind?" value={postValue} onChange={handleChange}></input>
                <img alt='null'></img>
                <button>Add Photo</button>
                <input type='submit' value='Post' />
            </form>
        </div>
    )
}

export default Newpost

import {useState} from 'react'
import Like from '@material-ui/icons/ThumbUp'

export const Post = ({post, index, clickLike, clickComment}) => {
    const [comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.target.value)
    }

    return (
        <div className='post' id={index}>
            <img alt='null'></img>
            {post.poster}
            <p>{post.post}</p>
            {post.likes}
            <button className={index} onClick={()=>clickLike(index)}> <Like/> Like</button>
            <button >Share</button>
            <input type='text' value={comment} onChange={handleChange}/>
            <button onClick={()=>clickComment(index, comment)}>Comment</button>
            {post.comments.map((comment) =>
                <div>
                    <p>{comment.commentor}</p>
                    <p>{comment.comment}</p>
                </div>
            )}
        </div>
    )
}

export default Post
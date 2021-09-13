import {useState} from 'react'
import Like from '@material-ui/icons/ThumbUp'

export const Post = ({post, postId, index, clickLike, clickComment}) => {
    const [comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.target.value)
    }

    return (
        <div className='post' id={postId}>
            <img alt='null'></img>
            {post.poster}
            <p>{post.post}</p>
            {post.likes}
            <button className={index} onClick={()=>clickLike(index, postId)}> <Like/> Like</button>
            <button >Share</button>
            <input type='text' value={comment} onChange={handleChange}/>
            <button onClick={()=>clickComment(index, postId, comment)}>Comment</button>
            {post.comments.map((comment) =>
                <div className={postId} id={comment.id}>
                    <p>{comment.commenter}</p>
                    <p>{comment.comment}</p>
                    {/*{comment.likes}
                    <button>  <Like /> Like</button>*/}
                </div>
            )}
        </div>
    )
}

export default Post
import { useState } from 'react'
import Like from '@material-ui/icons/ThumbUp'
import { Avatar, Button, IconButton, Typography } from '@material-ui/core'

export const Post = ({post, postId, index, clickLike, clickComment, timestamp}) => {
    const [comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.target.value)
    }

    const handleComment = () => {
        clickComment(index, postId, comment)
        setComment("")
    }

    return (
        <div className='post' id={postId}>
            <div className='post_top'>
                <Avatar src={post.posterPic} alt='null'></Avatar>
                <div className='post_info'>
                    <h3>{post.posterName}</h3>
                    <p>{(new Date(timestamp)).toLocaleString()}</p>
                </div>
            </div>
            <p>{post.post}</p>
            <div className='post_options'>
                <div className='post-option'>
                {post.likes}
                <Button className={index} onClick={()=>clickLike(index, postId)}>
                    <Like/>
                    Like
                </Button>
                </div>
                <div className='post_option'>
                <input type='text' value={comment} onChange={handleChange}/>
                <Button onClick={handleComment}>Comment</Button>  
                </div>       
                <div className='post-option'>   
                <Button >Share</Button>
                </div>
            </div>
            <div className='comments'>
            {post.comments.map((comment) =>
                <div className='comment' id={comment.id}>
                    <div className='comment_top'>
                        <Avatar src={comment.commenterPic} alt="null" />
                        <h4>{comment.commenter}</h4>
                    </div>
                    <div>
                        <p>{comment.comment}</p>
                    </div>
                    {/*{comment.likes}
                    <Button>  <Like /> Like</Button>*/}
                </div>
            )}
            </div>
        </div>
    )
}

export default Post
import Post from './Post'

const Posts = ( {posts, clickLike, clickComment} ) => {
    return (
        <>
            {posts.map((post, index) => (
                <Post 
                    key={index}
                    post={post}
                    index={index}
                    clickLike={clickLike}
                    clickComment={clickComment}
                />
            ))}
        </>
    )
}

export default Posts

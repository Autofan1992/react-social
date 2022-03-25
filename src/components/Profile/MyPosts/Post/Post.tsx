import styles from './Post.module.scss'
import avatar from '../../../../images/user.svg'

type PropsType = {
    post: string
    id: number
    deletePost: (id: number) => void
    likePost: (id: number) => void
    likesCount: number
}

const Post = ({ post, id, likePost, deletePost, likesCount }: PropsType) => {
    return (
        <li className={`${styles.postItem} list-group-item`}>
            <div className="d-flex">
                <div className={styles.avatar}>
                    <img src={avatar} className="w-100" alt=""/>
                </div>
                <div>{post}</div>
            </div>
            <hr/>
            <div className="d-flex">
                {!likesCount ? 'Click thumb up' :
                    <span className="me-2">Likes: {likesCount}</span>}
                <span className="ms-auto"
                      onClick={() => likePost(id)}>👍</span>
            </div>
            <div className="d-flex">
                <button onClick={() => deletePost(id)}>Delete post</button>
            </div>
        </li>
    )
}

export default Post
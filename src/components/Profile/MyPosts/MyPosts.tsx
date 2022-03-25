import styles from './MyPosts.module.scss'
import Post from './Post/Post'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLength, minLength, requiredField } from '../../../redux/utilities/validators/validators'
import { createField, Textarea } from '../../common/FormControls/FormControls'
import { PostType } from '../../../types/types'

const maxLength10 = maxLength(10)
const minLength2 = minLength(2)

type PropsType = {
    addPost: (post: string) => void
    deletePost: (id: number) => void
    likePost: (id: number) => void
    posts: Array<PostType>
}

const MyPosts = ({ addPost, deletePost, likePost, posts }: PropsType) => {
    const addNewPost = ({ post }: PostType) => addPost(post)

    return (
        <div className={styles.myPosts}>
            <h2>My posts</h2>
            <div className={styles.newPost}>
                <PostReduxForm onSubmit={addNewPost}/>
            </div>
            <ul className={`${styles.posts} list-group`}>
                {posts
                    .map((p) => <Post
                        key={p.id} id={p.id}
                        post={p.post}
                        likesCount={p.likesCount}
                        likePost={likePost}
                        deletePost={deletePost}
                    />)
                }
            </ul>
        </div>
    )
}

type InputNames = keyof PostType
const PostForm = ({ handleSubmit }: InjectedFormProps<PostType>) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                {createField<InputNames>('Start typing something...', 'post', [requiredField, maxLength10, minLength2], Textarea)}
            </div>
            <button className="btn btn-primary mt-3">Add Post</button>
        </form>
    )
}

const PostReduxForm = reduxForm<PostType>({ form: 'postForm' })(PostForm)

export default MyPosts
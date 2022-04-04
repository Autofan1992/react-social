import styles from './MyPosts.module.scss'
import Post from './Post/Post'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLength, minLength, requiredField } from '../../../redux/utilities/validators/validators'
import { createField, Textarea } from '../../common/FormControls/FormControls'
import { PostType } from '../../../types/types'
import { FC } from 'react'

const maxLength10 = maxLength(10)
const minLength2 = minLength(2)

const MyPosts: FC<PropsType> = ({ addPost, deletePost, likePost, posts }) => {
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

const PostForm: FC<InjectedFormProps<PostType>> = ({ handleSubmit }) => {
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

type PropsType = {
    addPost: (post: string) => void
    deletePost: (id: number) => void
    likePost: (id: number) => void
    posts: Array<PostType>
}

export default MyPosts
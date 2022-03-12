import styles from './Post.module.scss'
import avatar from '../../../../images/user.svg'
import { FC } from 'react'

type PropsType = {
    text: string
    id: number
    likePost: (id: number) => void
    likesCount: number
}

const Post: FC<PropsType> = ({ text, id, likePost, likesCount }) => {
    return (
        <li className={`${styles.postItem} list-group-item`}>
            <div className="d-flex">
                <div className={styles.avatar}>
                    <img src={avatar} className="w-100" alt=""/>
                </div>
                <div>{text}</div>
            </div>
            <hr/>
            <div className="d-flex">
                {!likesCount ? 'Нажмите палец вверх' :
                    <span className="me-2">Нравиться: {likesCount}</span>}
                <span className="ms-auto"
                      onClick={() => likePost(id)}>👍</span>
            </div>
        </li>
    )
}

export default Post
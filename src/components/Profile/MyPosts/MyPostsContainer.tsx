import { profileActions, addPost } from '../../../redux/reducers/profile-reducer'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'
import { getPostId, getPosts } from '../../../redux/selectors/profile-selectors'
import { AppStateType } from '../../../redux/redux-store'

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: getPosts(state),
        postId: getPostId(state)
    }
}

export default connect(mapStateToProps, { addPost, deletePost: profileActions.deletePost, likePost: profileActions.likePost })(MyPosts)
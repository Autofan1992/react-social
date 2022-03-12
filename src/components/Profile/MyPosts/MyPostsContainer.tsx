import { addPost, likePost } from "../../../redux/reducers/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { getPostID, getPosts } from "../../../redux/selectors/profile-selectors";
import { AppStateType } from "../../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: getPosts(state),
        postID: getPostID(state)
    }
}

export default connect(mapStateToProps, { addPost, likePost })(MyPosts);
import {connect} from "react-redux";
import Friends from "./Friends";

/*const oldFriendsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    const state = store.getState().sidebar;
                }
            }

        </StoreContext.Consumer>
    );
}*/

let mapStateToProps = (state) => {
    return {
        friends: state.sidebar.friends
    }
}

const FriendsContainer = connect(mapStateToProps)(Friends)

export default FriendsContainer
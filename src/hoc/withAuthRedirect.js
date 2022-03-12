import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getIsAuth} from "../redux/selectors/auth-selectors";

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state)
})

export default function withAuthRedirect(Component) {
    function WrappedComponent(props) {
        return !props.isAuth ? <Redirect to={'login'}/> : <Component {...props}/>
    }

    return connect(mapStateToProps)(WrappedComponent)
}
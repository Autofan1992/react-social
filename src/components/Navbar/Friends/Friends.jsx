import styles from './Friends.module.scss';
import FriendItem from "./FriendItem/FriendItem";

function Friends(props) {

    let friendsElements = props.friends.map((p, index) => <FriendItem key={index} name={p.name}/>)

    return (
        <div className={styles.friendsBlock}>
            <p>Friends</p>
            <div className={styles.friendsItems}>
                {friendsElements}
            </div>
        </div>
    )
}

export default Friends
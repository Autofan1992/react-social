import styles from '../Friends.module.scss';

function FriendItem(props) {
    return (
        <div className={styles.friendItem}>
            <p>{props.name}</p>
        </div>
    )
}

export default FriendItem
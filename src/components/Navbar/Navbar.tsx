import styles from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className={styles.navMenu}>
            <NavLink to="/profile" className={styles.item} activeClassName={styles.active}>Profile</NavLink>
            <NavLink to="/dialogs" className={styles.item} activeClassName={styles.active}>Messages</NavLink>
            <NavLink to="/news" className={styles.item} activeClassName={styles.active}>News</NavLink>
            <NavLink to="/music" className={styles.item} activeClassName={styles.active}>Music</NavLink>
            <NavLink to="/settings" className={styles.item} activeClassName={styles.active}>Settings</NavLink>
            <NavLink to="/users" className={styles.item} activeClassName={styles.active}>Users</NavLink>
            <NavLink to="/todolist" className={styles.item} activeClassName={styles.active}>Todo List</NavLink>
            <NavLink to="/weather" className={styles.item} activeClassName={styles.active}>Weather</NavLink>
            <NavLink to="/budgets" className={styles.item} activeClassName={styles.active}>Budgets</NavLink>
        </nav>
    )
}

export default Navbar
import { NavLink } from "react-router-dom";
import styles from './styles.module.css'

export default function Sidebar() {
  return (
    <aside className={styles.aside}>
      <div className={styles.item}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? styles.current : ""}
        >
          Overview
        </NavLink>
      </div>

      <div className={styles.item}>
        <NavLink
          to="/entries"
          className={({ isActive }) => isActive ? styles.current : ""}
        >
          Entries
        </NavLink>
      </div>

      <div className={styles.item}>
        <NavLink
          to="/posts"
          className={({ isActive }) => isActive ? styles.current : ""}
        >
          Posts
        </NavLink>
      </div>

      <div className={styles.item}>
        <NavLink
          to="/profile"
          className={({ isActive }) => isActive ? styles.current : ""}
        >
          Author
        </NavLink>
      </div>
    </aside>
  )
}

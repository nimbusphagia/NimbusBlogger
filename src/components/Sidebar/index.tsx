import { NavLink } from "react-router-dom";
import styles from './styles.module.css'

export default function Sidebar() {
  return (
    <aside className={styles.aside}>
      <div className={styles.item}>
        <button className={styles.create}>+</button>
      </div>
      <div className={styles.item}>
        <NavLink to='/'>Overview</NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to='/entries'>Blog entries</NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to='/moderation'>Moderation</NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to='/profile'>Account settings</NavLink>
      </div>
    </aside>
  )
}


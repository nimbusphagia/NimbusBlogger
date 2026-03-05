import { NavLink, useLocation } from "react-router-dom";
import styles from './styles.module.css'

export default function Sidebar() {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <aside className={styles.aside}>
      <div
        className={`${styles.item} ${currentRoute === '/' ? styles.current : ''}`}
      >
        <NavLink to='/'>Overview</NavLink>
      </div>
      <div
        className={`${styles.item} ${currentRoute === '/entries' ? styles.current : ''}`}
      >
        <NavLink to='/entries'>Entries</NavLink>
      </div>
      <div
        className={`${styles.item} ${currentRoute === '/moderation' ? styles.current : ''}`}
      >
        <NavLink to='/posts'>Posts</NavLink>
      </div>
      <div className={`${styles.item} ${currentRoute === '/profile' ? styles.current : ''}`}>
        <NavLink to='/profile'>Author</NavLink>
      </div>
    </aside>
  )
}


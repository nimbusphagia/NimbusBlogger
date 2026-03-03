import { NavLink, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import styles from './styles.module.css'
import { apiClient } from "../../api/client";
import type { Entry } from "../../types/entry";

export default function Sidebar() {
  const user = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;

  async function handleCreate() {
    const entry = await apiClient<Entry>(`/users/${user.id}/entries`, { method: 'POST', });
    navigate(`entries/${entry.id}`)
  }
  return (
    <aside className={styles.aside}>
      <div
        className={`${styles.item} ${currentRoute === '/' ? styles.current : ''}`}
      >
        <NavLink to='/'>Overview</NavLink>
      </div>
      <div className={styles.item}>
        <button
          className={styles.create}
          onClick={handleCreate}>Create</button>
      </div>

      <div
        className={`${styles.item} ${currentRoute === '/entries' ? styles.current : ''}`}
      >
        <NavLink to='/entries'>Blog</NavLink>
      </div>
      <div
        className={`${styles.item} ${currentRoute === '/moderation' ? styles.current : ''}`}
      >
        <NavLink to='/moderation'>Admin</NavLink>
      </div>
      <div className={`${styles.item} ${currentRoute === '/profile' ? styles.current : ''}`}>
        <NavLink to='/profile'>Writer</NavLink>
      </div>
    </aside>
  )
}


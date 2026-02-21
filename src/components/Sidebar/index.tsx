import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import styles from './styles.module.css'
import { apiClient } from "../../api/client";
import type { Entry } from "../../types/entry";

export default function Sidebar() {
  const user = useLoaderData();
  const navigate = useNavigate();

  async function handleCreate() {
    const entry = await apiClient<Entry>(`/users/${user.id}/entries`, { method: 'POST', });
    navigate(`entries/${entry.id}`)
  }

  return (
    <aside className={styles.aside}>
      <div className={styles.item}>
        <button
          className={styles.create}
          onClick={handleCreate}>New Entry</button>
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


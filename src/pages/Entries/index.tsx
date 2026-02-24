import style from './styles.module.css'
import { useLoaderData } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import type { Entry } from "../../types/entry";

export function Entries() {
  const entries = useLoaderData();
  return (
    <main className={style.main}>
      <header>
        <h2>My Entries</h2>
      </header>
      {entries.map((e: Entry) => {
        return (
          <div className={style.entry} key={e.id}>
            <div className={style.entryInfo}>
              <p>{e.title}</p>
            </div>
            <div className={style.actions}>
              <NavLink to={e.id}>Edit</NavLink>
            </div>
          </div>
        )
      })}
    </main>
  )
}

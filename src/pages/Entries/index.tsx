import style from './styles.module.css'
import { Form, useFetcher, useLoaderData, useRouteLoaderData } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import type { Entry } from "../../types/entry";

export function Entries() {
  const entries = useLoaderData();
  const user = useRouteLoaderData('root');
  const fetcher = useFetcher();

  return (
    <main className={style.main}>
      <header className={style.header}>
        <h2>My Entries</h2>
        <Form method='post' className={style.hiddenForm}>
          <input type="hidden" name='intent' value='create' />
          <input type="hidden" name='userId' value={user.id} />
          <button
            className={style.createBtn}
            type="submit">New</button>
        </Form>
      </header>
      <div className={style.entries}>
        {entries.map((e: Entry) => {
          return (
            <div className={style.entry} key={e.id}>
              <div className={style.entryInfo}>
                <p>{e.title}</p>
              </div>
              <div className={style.actions}>
                <NavLink
                  to={e.id}
                  className={style.editBtn}>Edit</NavLink>
                <fetcher.Form method="post" className={style.hiddenForm}>
                  <input type="hidden" name="intent" value="delete" />
                  <input type="hidden" name="entryId" value={e.id} />
                  <button
                    className={style.delBtn}
                    type="submit">Del</button>
                </fetcher.Form>
              </div>
            </div>
          )
        })}

      </div>
    </main>
  )
}

import style from './styles.module.css'
import { Form, useFetcher, useLoaderData, useRouteLoaderData } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import type { Entry } from "../../types/entry";

function EntryRow({ entry, userId }: { entry: Entry, userId: string }) {
  const fetcher = useFetcher();
  return (
    <div className={`${style.entry} ${entry.publishedAt ? style.published : ''}`}>
      <div className={style.entryInfo}>
        <NavLink to={entry.id} className={style.editBtn}>{entry.title}</NavLink>
      </div>
      <div className={style.actions}>
        <fetcher.Form method="post" className={style.hiddenForm}>
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="entryId" value={entry.id} />
          <button
            className={entry.publishedAt ? style.unpublishBtn : style.publishBtn}
            type="submit"
            name="intent"
            value={entry.publishedAt ? 'unpublish' : 'publish'}
          >{entry.publishedAt ? 'Unpublish' : 'Publish'}</button>
          <button
            className={style.delBtn}
            type="submit"
            name="intent"
            value="delete"
          >Del</button>
        </fetcher.Form>
      </div>
    </div>
  );
}
export function Entries() {
  const entries = useLoaderData();
  const user = useRouteLoaderData('root');

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
        {entries.map((e: Entry) => (
          <EntryRow key={e.id} entry={e} userId={user.id} />
        ))}
      </div>
    </main>
  )
}

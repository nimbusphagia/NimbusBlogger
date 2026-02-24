import { useLoaderData, useSubmit } from 'react-router-dom'
import styles from './styles.module.css'
import { useState } from 'react';
import type { Entry } from '../../types/entry';

export function Editor() {
  const entry = useLoaderData() as Entry;
  const submit = useSubmit();

  const [title, setTitle] = useState(entry.title);

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <input
          type="text"
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => submit({ title }, { method: 'post' })}
        />
      </header>
      <main className={styles.canvas}>
      </main>
    </div>
  )
}

import { useLoaderData, useOutletContext, useSubmit } from 'react-router-dom'
import styles from './styles.module.css'
import { useState } from 'react';
import type { Entry } from '../../types/entry';
import type { User } from '../../types/user';
import type { Block } from '../../types/block';
import { BlocksInit } from '../../components/BlocksInit';
import { BlockElement } from '../../components/BlockElement';

export function Editor() {
  const user = useOutletContext<User>();
  const entry = useLoaderData<Entry>();
  const blocks: Block[] = entry.blocks;
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
          onBlur={() => submit({
            intent: 'editTitle',
            authorId: user.id,
            title
          }, { method: 'post' })}
        />
      </header>
      <main className={styles.canvas}>
        {blocks.map((block) => (
          <BlockElement key={block.id} block={block} />
        ))}
        <BlocksInit />
      </main>
    </div>
  )
}

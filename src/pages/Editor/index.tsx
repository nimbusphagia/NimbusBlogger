import { useLoaderData, useOutletContext, useSubmit } from 'react-router-dom'
import styles from './styles.module.css';
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

  return (
    <div className={styles.body}>
      <div className={styles.editor}>
        <header className={styles.header}>
          <input
            type="text"
            name='title'
            defaultValue={entry.title}
            onBlur={(e) => {
              if (e.target.value !== entry.title) {
                submit({
                  intent: 'editTitle',
                  authorId: user.id,
                  title: e.target.value
                }, { method: 'post' })
              }
            }
            }
          />
        </header>
        <main className={styles.blocks}>
          {blocks.map((block) => (
            <BlockElement key={block.id} block={block} />
          ))}
          <BlocksInit />
        </main>
      </div>
    </div>
  )
}

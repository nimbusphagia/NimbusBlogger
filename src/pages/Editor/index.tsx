import { useFetcher, useSubmit, useLoaderData, useOutletContext, useRevalidator } from 'react-router-dom'
import styles from './styles.module.css';
import type { Entry } from '../../types/entry';
import type { User } from '../../types/user';
import type { Block } from '../../types/block';
import { BlocksInit } from '../../components/BlocksInit';
import { BlockElement } from '../../components/BlockElement';
import type { EditorActionResult } from './actions';
import { useEffect, useState } from 'react';

export function Editor() {
  const user = useOutletContext<User>();
  const entry = useLoaderData<Entry>();
  const blocks: Block[] = entry.blocks;
  const fetcher = useFetcher<EditorActionResult>();
  const revalidator = useRevalidator();
  const submit = useSubmit();
  const [newBlockId, setNewBlockId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (fetcher.state !== "idle") return;
    if (!fetcher.data) return;

    if (fetcher.data.type === "createBlock") {
      setNewBlockId(fetcher.data.blockId);
      revalidator.revalidate();
    }
  }, [fetcher.state]);

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
                fetcher.submit({
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
          {blocks.map((block) => {
            return (
              <BlockElement
                key={block.id}
                block={block}
                autoFocus={block.id === newBlockId} />
            )
          })}
          <BlocksInit
            count={blocks.length}
            fetcher={fetcher} />

          <button
            className={styles.delBtn}
            type="button"
            onClick={() => setShowConfirm(true)}
          >
            Delete Entry
          </button>

        </main>
      </div>
      {showConfirm && (
        <div className={styles.veil}>
          <div className={styles.confirmDelete}>
            <p>Are you sure?</p>
            <div className={styles.confirmButtons}>
              <button
                type="button"
                onClick={() => {
                  submit(
                    {
                      intent: 'deleteEntry',
                      entryId: entry.id,
                      authorId: user.id,
                    },
                    { method: 'post' }
                  );
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowConfirm(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

import { useFetcher, useSubmit, useLoaderData, useOutletContext, useRevalidator } from 'react-router-dom'
import styles from './styles.module.css';
import type { Entry } from '../../types/entry';
import type { User } from '../../types/user';
import type { Block } from '../../types/block';
import { BlocksInit } from '../../components/BlocksInit';
import { BlockElement } from '../../components/BlockElement';
import type { EditorActionResult } from './actions';
import { useEffect, useRef, useState } from 'react';

export function Editor() {
  const user = useOutletContext<User>();
  const entry = useLoaderData<Entry>();
  const blocks: Block[] = entry.blocks;
  const fetcher = useFetcher<EditorActionResult>();
  const revalidator = useRevalidator();
  const submit = useSubmit();
  const [newBlockId, setNewBlockId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [publishMsg, setPublishMsg] = useState<string | null>(null);
  const publishMsgRef = useRef<HTMLHeadingElement>(null);


  useEffect(() => {
    if (publishMsg && publishMsgRef.current) {
      publishMsgRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [publishMsg]);
  useEffect(() => {
    if (fetcher.state !== "idle") return;
    if (!fetcher.data) return;

    if (fetcher.data.type === "createBlock") {
      setNewBlockId(fetcher.data.blockId);
      revalidator.revalidate();
    }
    if (fetcher.data.type === "publishEntry") {
      const timer = setTimeout(() => setPublishMsg(null), 2000);
      setPublishMsg('Set to public');
      return () => clearTimeout(timer);
    }
    if (fetcher.data.type === "unpublishEntry") {
      const timer = setTimeout(() => setPublishMsg(null), 2000);
      setPublishMsg('Set to private!');
      return () => clearTimeout(timer);
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


        </main>
      </div>
      {showConfirm && (
        <div className={styles.veil}>
          <div className={styles.confirmDelete}>
            <p>Are you sure?</p>
            <div className={styles.confirmButtons}>
              <button
                type="button" onClick={() => {
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
      {publishMsg && (
        <div className={`${styles.publishMsg} ${entry.publishedAt ? styles.public : styles.private}`}>
          < h1 ref={publishMsgRef}>
            {publishMsg}
          </h1>
        </div>
      )
      }
      <div className={styles.utilBtns}>
        <button
          className={styles.delBtn}
          type="button"
          onClick={() => setShowConfirm(true)}
        >
          Delete
        </button>
        <button
          className={`${entry.publishedAt ? styles.unpublishBtn : styles.publishBtn}`}
          type="button"
          onClick={() => {
            fetcher.submit(
              {
                intent: `${entry.publishedAt ? 'unpublishEntry' : 'publishEntry'}`,
                entryId: entry.id,
                authorId: user.id,
              },
              { method: 'post' }
            );
          }}
        >
          {entry.publishedAt ? 'Unpublish' : 'Publish'}
        </button>

      </div>
    </div >
  )
}

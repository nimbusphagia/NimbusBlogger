import styles from './styles.module.css'
type Entry = {
  id: string,
  title: string,
  body: string,
}

type EntryStatProps = {
  title: string,
  entries: Entry[],
}
export function EntryStat({ title, entries }: EntryStatProps) {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>
      {entries.map(
        (entry) => {
          return (
            <div key={entry.id} className={styles.entry}>
              <h4>{entry.title}</h4>
              <p>{entry.body}</p>
            </div>
          )
        }
      )}
    </div>
  )
};

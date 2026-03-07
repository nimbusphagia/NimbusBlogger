import { Link } from 'react-router-dom'
import styles from './styles.module.css'
type Entry = {
  id: string,
  title: string,
}

type EntryStatProps = {
  title: string,
  entries: Entry[],
  customClass?: string,
}
export function EntryStat({ title, entries, customClass }: EntryStatProps) {
  return (
    <div className={styles.main}>
      <div className={`${styles.header} ${customClass}`}>
        <h3>{title}</h3>
      </div>
      <div className={styles.entries}>

        {entries.map(
          (entry) => {
            return (
              <div key={entry.id} className={`${styles.entry} ${customClass}`}>
                <Link to={`/entries/${entry.id}`}>{entry.title}</Link>
              </div>
            )
          }
        )}

      </div>
    </div>
  )
};

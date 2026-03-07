import { useLoaderData } from "react-router-dom";
import styles from "./styles.module.css";
import { Stat } from "../../components/Stat";
import { EntryStat } from "../../components/EntryStat";

export function Dashboard() {
  const { published, drafts, mostRecent, mostLiked } = useLoaderData();
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1>Overview</h1>
      </header>
      <main className={styles.main}>

        <div className={styles.statistics}>
          <Stat
            name='Published'
            quantity={published}
            customClass={styles.published}
          />
          <Stat
            name='Drafts'
            quantity={drafts}
            customClass={styles.drafts}
          />
        </div>
        <div className={styles.entries}>
          <EntryStat
            title="Most recent"
            entries={mostRecent}
            customClass={styles.title1}
          />
          <EntryStat
            title="Most liked"
            entries={mostLiked}
            customClass={styles.title2}
          />

        </div>
      </main>
    </div>
  );
}

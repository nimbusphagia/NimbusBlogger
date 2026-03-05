import { useLoaderData } from "react-router-dom";
import styles from "./styles.module.css";
import { Stat } from "../../components/Stat";

export function Dashboard() {
  const { author, published, drafts } = useLoaderData();
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1>{author.name}'s blog</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.entries}>
        </div>
        <div className={styles.statistics}>
          <Stat
            name='Published'
            quantity={published}
          />
          <Stat
            name='Drafts'
            quantity={drafts}
          />
        </div>
      </main>
    </div>
  );
}

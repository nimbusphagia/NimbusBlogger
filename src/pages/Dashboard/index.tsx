import { useOutletContext } from "react-router-dom";
import type { User } from "../../types/user";
import styles from "./styles.module.css";
import { Stat } from "../../components/Stat";

export function Dashboard() {
  const user = useOutletContext() as User;
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1>{user.email}'s blog</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.entries}>
        </div>
        <div className={styles.statistics}>
          <Stat
            name='Published'
            quantity={3}
          />
          <Stat
            name='Drafts'
            quantity={1}
          />
          <Stat
            name='Total Comments'
            quantity={15}
          />
        </div>
      </main>
    </div>
  );
}

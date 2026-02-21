import { useOutletContext } from "react-router-dom";
import type { User } from "../../types/user";
import styles from "./styles.module.css";
import { Stat } from "../../components/Stat";
import { EntryStat } from "../../components/EntryStat";

const mockEntries = [{
  id: 'asd1',
  title: 'very interesting entry about dogs',
  body: 'i once met a very silly dog that liked to eat the leafs that would fall from the tree at my frontyard...',
},
{
  id: 'asd2',
  title: 'very interesting entry about dogs',
  body: 'i once met a very silly dog that liked to eat the leafs that would fall from the tree at my frontyard...',
},
{
  id: 'asd3',
  title: 'very interesting entry about dogs',
  body: 'i once met a very silly dog that liked to eat the leafs that would fall from the tree at my frontyard...',
},

];
export function Dashboard() {
  const user = useOutletContext() as User;
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1>{user.email}'s blog</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.entries}>
          <EntryStat title='Most liked' entries={mockEntries} />
          <EntryStat title='Most commented' entries={mockEntries} />
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

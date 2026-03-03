import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import styles from './styles.module.css';
import { useLoaderData } from "react-router-dom";
import type { User } from "../../types/user";

export default function RootLayout() {
  const user = useLoaderData() as User;
  return (
    <div className={styles.bodyRoot}>
      <Sidebar />
      <Outlet context={user} />
    </div >
  )
}

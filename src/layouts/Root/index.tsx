import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import styles from './styles.module.css';

export default function RootLayout() {
  return (
    <div className={styles.bodyRoot}>
      <Outlet />
      <Sidebar />
    </div >
  )
}

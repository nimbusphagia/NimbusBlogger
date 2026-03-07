import styles from './styles.module.css'
import { Form, useActionData, useNavigation } from "react-router-dom";

export function Login() {
  const navigation = useNavigation();
  const data = useActionData() as { error?: string } | undefined;
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className={styles.body}>
      <Form method="post" className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.logo}>NimbusBlogger</h1>
          {data?.error && <p className={styles.errorMsg}>{data.error}</p>}
        </header>
        <div className={styles.items}>

          <div className={styles.formItem}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className={styles.formItem}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>

        </div>
        <button className={styles.loginBtn} disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </Form>
    </main>
  )
}

import styles from './styles.module.css'
import { Form, useActionData, useNavigation } from "react-router-dom";

export function Login() {
  const navigation = useNavigation();
  const data = useActionData() as { error?: string } | undefined;
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className={styles.main}>
      <div>
        <h2>Login</h2>

        {data?.error && <p>{data.error}</p>}

        <Form method="post">
          <div className="formItem">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="formItem">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>

          <button className="login btn" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </Form>
      </div>
    </main>
  )
}

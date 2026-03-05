import { Form, useLoaderData } from 'react-router-dom'
import style from './styles.module.css'

export function Author() {
  const author = useLoaderData();
  return (
    <div
      className={style.body}>
      <header
        className={style.header}>
        <h1>Author</h1>
      </header>
      <main
        className={style.main}>
        <Form>
          <div
            className={style.formItem}>
            <label htmlFor="name">Username</label>
            <input type="text" value={author.name} />
          </div>
          <div
            className={style.formItem}>
            <label htmlFor="email">Email</label>
            <input type="email" value={author.email} />
          </div>
          <div
            className={style.formItem}>
            <label htmlFor="email">Password</label>
            <button
              className={style.passwordPrompt}
            >Change</button>
          </div>
        </Form>
      </main>
    </div>
  )
}

import { useFetcher, useLoaderData, Form } from 'react-router-dom'
import style from './styles.module.css'
import { useEffect, useRef, useState, type FocusEvent } from 'react';

export function Author() {
  const author = useLoaderData();
  const fetcher = useFetcher();
  const [passwordPrompt, setPasswordPrompt] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (fetcher.data?.type === 'changePassword') {
      setPasswordPrompt(false);
      setSuccessMsg('Password changed successfully!');
      const timer = setTimeout(() => setSuccessMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [fetcher.data]);
  useEffect(() => {
    if (textareaRef.current) {
      autoResize(textareaRef.current)
    }
  }, [author.imgUrl]);

  useEffect(() => {
    if (fetcher.data?.type === 'changePassword') {
      setPasswordPrompt(false);
    }
  }, [fetcher.data]);

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (fetcher.state !== "idle") return;
    if (e.target.value === e.target.defaultValue) return;

    const form = e.currentTarget.form;
    if (!form) return;

    fetcher.submit(form);
  }
  function autoResize(el: HTMLTextAreaElement) {
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"
  }
  return (
    <div
      className={style.body}>
      <header
        className={style.header}>
        <h1>Author</h1>
        {successMsg && <p className={style.success}>{successMsg}</p>}
      </header>
      <fetcher.Form
        className={style.main}
        method='post'
      >
        <div
          className={style.profileImg}>
          {author.imgUrl &&
            <img src={author.imgUrl} alt="" />
          }
          <input
            type="url"
            name='imgUrl'
            defaultValue={author.imgUrl}
            placeholder='Insert a valid img url'
            onBlur={handleBlur}
          />
        </div>
        <input type="hidden" name='authorId' value={author.id} />
        <div
          className={style.formItem}>
          <label htmlFor="name">Username</label>
          <input
            name='name'
            type="text"
            defaultValue={author.name}
            onBlur={handleBlur}
          />
        </div>
        <div
          className={style.formItem}>
          <label htmlFor="email">Email</label>
          <input
            name='email'
            type="email"
            defaultValue={author.email}
            onBlur={handleBlur}
          />
        </div>
        <div
          className={`${style.formItem} ${style.formTextarea}`}>
          <label htmlFor="description">About me</label>
          <textarea
            name='description'
            defaultValue={author.description}
            placeholder='Give a small description'
            rows={1}
            onBlur={handleBlur}
            ref={textareaRef}
            onInput={(e) => autoResize(e.currentTarget)}
            autoCorrect='off'
            spellCheck='false'
          />
        </div>


        <div
          className={style.formItem}>
          <label htmlFor="email">Password</label>
          <button
            type='button'
            className={style.passwordPrompt}
            onClick={() => setPasswordPrompt(true)}
          >Change</button>
        </div>



        {passwordPrompt && (
          <div className={style.veil}>
            <div
              className={style.passwordForm}
            >
              <h1>Change Password</h1>
              {fetcher.data?.type === 'error' && (
                <p className={style.error}>{fetcher.data.message}</p>
              )}
              <div
                className={style.formItem}>
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  id='oldPassword'
                  name='oldPassword'
                  type="password"
                  placeholder='Old password'
                />
              </div>
              <div
                className={style.formItem}>
                <label htmlFor="newPassword">New Password</label>
                <input
                  id='newPassword'
                  name='newPassword'
                  type="password"
                  placeholder='New password'
                />
              </div>
              <div
                className={style.formItem}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type="password"
                  placeholder='New password'
                />
              </div>
              <div
                className={style.passwordBtns}
              >
                <button
                  className={style.returnBtn}
                  onClick={() => setPasswordPrompt(false)}
                >return</button>
                <button
                  className={style.submitBtn}
                  name='intent'
                  value='changePassword'
                  type='submit'
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </fetcher.Form >
      <div className={style.logout}>
        <Form method="post" action="/logout">
          <button type="submit">Logout</button>
        </Form>
      </div>
    </div>
  )
}

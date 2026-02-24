import { useOutletContext, useSubmit } from "react-router-dom"
import style from "./styles.module.css"
import type { User } from "../../types/user";

export function BlocksInit() {
  const user = useOutletContext<User>();
  const submit = useSubmit();

  const createBlock = (blockType: string) => {
    submit(
      {
        intent: 'createBlock',
        authorId: user.id,
        blockType
      },
      { method: "post" }
    )
  }

  return (
    <div className={style.form}>
      <button type="button" onClick={() => createBlock("TEXT")} className={style.button}>
        Txt
      </button>
      <button type="button" onClick={() => createBlock("IMAGE")} className={style.button}>
        Img
      </button>
      <button type="button" onClick={() => createBlock("HEADING")} className={style.button}>
        Hh
      </button>
    </div>
  )
}

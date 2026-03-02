import { useOutletContext, useSubmit } from "react-router-dom"
import style from "./styles.module.css"
import type { User } from "../../types/user";

type BlocksInitProps = {
  count: number
}

export function BlocksInit({ count }: BlocksInitProps) {
  const user = useOutletContext<User>();
  const submit = useSubmit();

  const createBlock = (blockType: string) => {
    submit(
      {
        intent: 'createBlock',
        authorId: user.id,
        blockType,
        index: count,
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

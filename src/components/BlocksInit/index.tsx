import { useFetcher, useOutletContext } from "react-router-dom"
import style from "./styles.module.css"
import type { User } from "../../types/user";

type BlocksInitProps = {
  count: number,
  fetcher: ReturnType<typeof useFetcher>
}

export function BlocksInit({ count, fetcher }: BlocksInitProps) {
  const user = useOutletContext<User>();

  const createBlock = (blockType: string) => {
    fetcher.submit(
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
      <button type="button" onClick={() => createBlock("HEADING")} className={style.button}>
        Head
      </button>
      <button type="button" onClick={() => createBlock("TEXT")} className={style.button}>
        Text
      </button>
      <button type="button" onClick={() => createBlock("IMAGE")} className={style.button}>
        Image
      </button>

    </div>
  )
}

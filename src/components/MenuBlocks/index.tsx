import { useSubmit } from "react-router-dom"
import style from "./styles.module.css"

export function MenuBlocks() {
  const submit = useSubmit()

  const createBlock = (type: string) => {
    submit(
      { type },
      { method: "post" }
    )
  }

  return (
    <div className={style.form}>
      <button type="button" onClick={() => createBlock("HEADING")} className={style.button}>
        Heading
      </button>

      <button type="button" onClick={() => createBlock("IMAGE")} className={style.button}>
        Image
      </button>

      <button type="button" onClick={() => createBlock("TEXT")} className={style.button}>
        Text
      </button>
    </div>
  )
}

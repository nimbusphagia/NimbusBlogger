import style from './styles.module.css'
import type { BlockType } from "../../types/block"

type BlockProps = {
  type: BlockType,
  text?: string,
  mediaSrc?: string,
}
export function Block({ type, text, mediaSrc }: BlockProps) {
  return (
    <>
      {
        type === 'IMAGE' &&
        <div className={style.imageBlock}>
          <img src={mediaSrc} alt="" />
        </div>
      }
      {
        type === 'TEXT' &&
        <div className={style.textBlock}>
          <textarea name="text"
          >{text}</textarea>
        </div>
      }
      {
        type === 'HEADING' &&
        <div className={style.textHeading}>
          <input type="text" value={text} />
        </div>
      }
    </>
  )
}

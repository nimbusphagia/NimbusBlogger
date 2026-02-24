import style from './styles.module.css'
import type { Block } from "../../types/block"


type Props = {
  block: Block
}
export function BlockElement({ block }: Props) {
  //Put an input with the blockid for future editing
  return (
    <>
      {
        block.blockType === 'IMAGE' &&
        <div className={style.imageBlock}>
          <img src={block.mediaSrc} alt="" />
        </div>
      }
      {
        block.blockType === 'TEXT' &&
        <div className={style.textBlock}>
          <textarea name="text"
          >{`epic text block: ${block.text}`}</textarea>
        </div>
      }
      {
        block.blockType === 'HEADING' &&
        <div className={style.textHeading}>
          <input type="text" value={block.text} />
        </div>
      }
    </>
  )
}

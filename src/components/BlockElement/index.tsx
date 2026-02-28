import style from './styles.module.css'
import type { Block } from "../../types/block"
import { useFetcher, useLoaderData, useParams } from 'react-router-dom'
import type { User } from '../../types/user'
import { useEffect, useRef } from 'react'

type Props = {
  block: Block
}

export function BlockElement({ block }: Props) {
  const user = useLoaderData<User>()
  const { entryId } = useParams<string>()
  const fetcher = useFetcher()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      autoResize(textareaRef.current)
    }
  }, [block.text])

  function handleBlur(currentValue: string) {
    if (
      block.blockType !== 'IMAGE' &&
      currentValue !== block.text &&
      entryId
    ) {
      fetcher.submit(
        {
          intent: 'editBlock',
          authorId: user.id,
          entryId,
          blockId: block.id,
          text: currentValue,
        },
        { method: 'post' }
      )
    }
  }

  function autoResize(el: HTMLTextAreaElement) {
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"
  }
  return (
    <div className={style.blockItem}>
      {block.blockType === 'IMAGE' && (
        <img src={block.mediaSrc} alt="" />
      )}

      {block.blockType === 'HEADING' && (

        <textarea
          rows={1}
          ref={textareaRef}
          className={style.blockHeading}
          name="text"
          defaultValue={block.text}
          onBlur={(e) => handleBlur(e.target.value)}
          onInput={(e) => autoResize(e.currentTarget)}
        />
      )}

      {block.blockType === 'TEXT' && (
        <textarea
          ref={textareaRef}
          rows={1}
          className={style.blockParagraph}
          name="text"
          defaultValue={block.text}
          onBlur={(e) => handleBlur(e.target.value)}
          onInput={(e) => autoResize(e.currentTarget)}
        />
      )}
    </div>
  )
}

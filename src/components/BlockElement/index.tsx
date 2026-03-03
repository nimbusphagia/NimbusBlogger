import style from './styles.module.css'
import type { Block } from "../../types/block"
import { useFetcher, useLoaderData, useParams } from 'react-router-dom'
import type { User } from '../../types/user'
import { useEffect, useRef } from 'react'

type Props = {
  block: Block,
  autoFocus: boolean
}

export function BlockElement({ block, autoFocus }: Props) {
  const user = useLoaderData<User>()
  const { entryId } = useParams<string>()
  const fetcher = useFetcher()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      autoResize(textareaRef.current)
    }
  }, [block.text]);

  useEffect(() => {
    if (!autoFocus) return;

    if (block.blockType === "IMAGE") {
      inputRef.current?.focus();
    } else {
      textareaRef.current?.focus();
    }
  }, [autoFocus]);

  function handleBlur(currentValue: string) {
    if (!entryId) return;

    const isImage = block.blockType === 'IMAGE';
    const previousValue = isImage ? block.mediaSrc : block.text;
    if (currentValue.trim() === '') {
      fetcher.submit({
        intent: 'deleteBlock',
        authorId: user.id,
        entryId,
        blockId: block.id,
      },
        { method: 'post' }
      );
      return;
    };
    if (currentValue !== previousValue) {
      fetcher.submit(
        {
          intent: 'editBlock',
          authorId: user.id,
          entryId,
          blockId: block.id,
          ...(isImage
            ? { mediaSrc: currentValue }
            : { text: currentValue }),
        },
        { method: 'post' }
      );
    };
  }
  function autoResize(el: HTMLTextAreaElement) {
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"
  }
  return (
    <>
      {block.blockType === 'IMAGE' && (
        <div className={`${style.blockItem} ${style.blockImg}`}>
          {block.mediaSrc &&
            <img
              className={style.img}
              src={block.mediaSrc} alt="" />}
          <input
            className={style.imgInput}
            ref={inputRef}
            type="url"
            placeholder='Insert image url'
            defaultValue={block.mediaSrc}
            onBlur={(e) => handleBlur(e.target.value)}
            autoComplete='off'
          />
        </div>
      )}

      {block.blockType === 'HEADING' && (

        <div className={style.blockItem}>
          <textarea
            rows={1}
            ref={textareaRef}
            className={style.blockHeading}
            name="text"
            id={`index-${block.index}`}
            defaultValue={block.text}
            onBlur={(e) => handleBlur(e.target.value)}
            onInput={(e) => autoResize(e.currentTarget)}
            autoComplete='off'
          />
        </div>
      )}

      {block.blockType === 'TEXT' && (
        <div className={style.blockItem}>
          <textarea
            ref={textareaRef}
            rows={1}
            className={style.blockParagraph}
            name="text"
            defaultValue={block.text}
            onBlur={(e) => handleBlur(e.target.value)}
            onInput={(e) => autoResize(e.currentTarget)}
            autoComplete='off'
          />
        </div>
      )}
    </>
  )
}

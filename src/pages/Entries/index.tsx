import { useLoaderData } from "react-router-dom"
import type { Entry } from "../../types/entry";

export function Entries() {
  const entries = useLoaderData();
  return (
    <div>
      {entries.map((e: Entry) => {
        return (
          <div key={e.id}>
            <p>{e.title}</p>
            <p>{e.id}</p>
          </div>
        )
      })}
    </div>
  )
}

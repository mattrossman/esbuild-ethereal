import { useState, useRef, createPortal } from "react"
import { render } from "react-dom"
import { Counter } from "@/components/Counter"
import { PreviewSplit } from "@/util/Preview"
import { Trello, useRealtimeBoard } from "@/components/Trello"
import { StickyNote } from "@/components/StickyNote"
import { OffscreenInput } from "@/components/OffscreenInput"

render(<App />, document.body)

function App() {
  const input = useRef()
  const [value, setValue] = useState()
  return (
    <>
      <OffscreenInput ref={input} value={value} onChange={(e) => setValue(e.target.value)} />
      <PreviewSplit>
        <StickyNote onClick={() => input.current.focus()}>{value}</StickyNote>
        <link rel="stylesheet" href="/build/index.css" />
      </PreviewSplit>
    </>
  )
}

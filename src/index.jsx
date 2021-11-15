import { useState } from "react"
import { render } from "react-dom"
import { Counter } from "@/components/Counter"
import { PreviewSplit } from "@/util/Preview"
import { Trello, useRealtimeBoard } from "@/components/Trello"

render(<App />, document.body)

function App() {
  const board = useRealtimeBoard("612d1d5d76abff8a743892e3")
  return (
    <PreviewSplit>
      <Trello board={board} />
      <link rel="stylesheet" href="/build/index.css" />
    </PreviewSplit>
  )
}

import { useState } from "react"
import { render } from "react-dom"
import { Counter } from "@/components/Counter"
import { PreviewSplit } from "@/util/Preview"
import { Trello } from "@/components/Trello"

render(<App />, document.body)

function App() {
  return (
    <PreviewSplit>
      <Trello boardId="612d1d5d76abff8a743892e3" />
      <link rel="stylesheet" href="/build/index.css" />
    </PreviewSplit>
  )
}

import { useState } from "react"
import { render } from "react-dom"
import { Counter } from "@/components/Counter"
import { PreviewSplit } from "@/util/Preview"

render(<App />, document.body)

function App() {
  const [state, setState] = useState({ count: 0 })
  return (
    <PreviewSplit>
      <Counter state={state} setState={setState} />
      <link rel="stylesheet" href="/build/index.css" />
    </PreviewSplit>
  )
}

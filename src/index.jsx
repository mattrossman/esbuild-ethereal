import { useState } from "react"
import { render } from "react-dom"
import { Counter } from "./components/Counter"

render(<App />, document.body)

function App() {
  const [state, setState] = useState({ count: 0 })
  return (
    <div>
      <Counter state={state} setState={setState} />
    </div>
  )
}

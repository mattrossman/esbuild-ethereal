import { render } from "react-dom"
import { useRef, useState } from "react"

import "./web-layer"
import "./web-layer-events"
import { StickyNote } from "@/components/StickyNote"
import { OffscreenInput } from "@/components/OffscreenInput"

AFRAME.registerComponent("text-input", {
  dependencies: ["web-layer", "web-layer-events"],
  init: function () {
    this.webLayerComponent = this.el.components["web-layer"]
    render(<Component onChange={(val) => console.log(val)} />, this.webLayerComponent.rootEl)
  },
  tick: function () {
    this.webLayerComponent.layer.update()
  },
})

function Component({ onChange }) {
  const ref = useRef()
  const [value, setValue] = useState()
  const onChangeInner = (e) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }
  return (
    <StickyNote onClick={() => ref.current.focus()}>
      {value}
      <OffscreenInput ref={ref} onChange={onChangeInner} />
    </StickyNote>
  )
}

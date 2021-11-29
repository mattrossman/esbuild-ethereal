import { createPortal, forwardRef } from "react"

export const OffscreenInput = forwardRef((props, ref) => {
  return createPortal(<input ref={ref} style={{ position: "fixed", zIndex: -1 }} {...props} />, document.body)
})

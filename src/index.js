import { render, createElement } from "preact"
import htm from "htm"

const html = htm.bind(createElement)

render(html`<p>Hello world</p>`, document.body)

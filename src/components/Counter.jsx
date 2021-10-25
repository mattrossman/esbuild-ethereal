import styles from "./Counter.module.scss"

export function Counter({ state, setState }) {
  const increment = () => setState({ count: state.count + 1 })
  return (
    <div class={styles.container}>
      <h1>Click me!</h1>
      <button onClick={increment} xr-layer>
        Count: {state.count}
      </button>
    </div>
  )
}

export function Counter({ state, setState }) {
  const increment = () => setState({ count: state.count + 1 })
  return (
    <div class="w-48 h-32 bg-white rounded-md p-4 border-2 border-black">
      <h1 class="font-bold mb-8">Click me!</h1>
      <button
        onClick={increment}
        xr-layer
        class="p-2 w-40 h-10 text-white bg-blue-500 hover:bg-blue-400 rounded focus:outline-none"
      >
        Count: {state.count}
      </button>
    </div>
  )
}

import { observable } from '@legendapp/state'
import { For } from '@legendapp/state/react'

//NO PROBLEM IF VALUE IS SET DIRECTLY
// const list$ = observable([1, 2, 3])
const list$ = observable([1, 2, 3].map((i) => ({ val: i }))) //For this bug, val is inside an object

const push = () => list$.push({ val: list$.length + 1 })

const clear = () => list$.set([])

const clearWithObs = () => list$.set(observable([]))

const description = `- Initially <PUSH> works for both <For> and <For optimized> lists. 
- But after <Clear> (() => list$.set([])), <PUSH> only <For> works, <For optimized> will work after push a couple times.
- If <Clear with Observable> (() => list$.set(observable([]))), <For> and <For optimized> will work.

NO PROBLEM IF VALUE IS SET DIRECTLY
const list$ = observable([1, 2, 3]) //no problem
const list$ = observable([1, 2, 3].map((i) => ({ val: i }))) //For this bug, val is inside an object
`

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h3>Legend State</h3>
      <div style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{description}</div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={push}>Push</button>
        <button onClick={clear}>Clear</button>
        <button onClick={clearWithObs}>Clear with Observable</button>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div>
          <div>{'<For /> Normal'}</div>
          <div>
            <For each={list$}>{(items$) => <div>{items$.val.get()}</div>}</For>
          </div>
        </div>
        <div>
          <div>{'<For /> Optimized'}</div>
          <div>
            <For each={list$} optimized>
              {(items$) => <div>{items$.val.get()}</div>}
            </For>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

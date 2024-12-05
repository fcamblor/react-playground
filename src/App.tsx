import {memo, useCallback, useEffect, useMemo, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let appRenderingCount = 0

const MON_STYLE = { color: 'red'}

function App() {
  appRenderingCount++
  const [count, setCount] = useState(0)
  // const [count2, setCount2] = useState(0)
  const [date, setDate] = useState(new Date())



  useEffect(() => {
    setInterval(() => { setDate(new Date())}, 2000)
  }, []);

  console.log(`Rendering App #${appRenderingCount} ...`)

  const result = useMemo(() => {
    console.log(`re-calculating result...`)
    return count + count2
  }, [count])
  //
  // const myCallback = useCallback(() => {
  //
  // }, [result])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React ({process.env.NODE_ENV})</h1>
      <div className="card">
        {42}<br/>
        {date.toISOString()}
        <MemoizedCounter style={MON_STYLE} name={1} count={count} onClick={() => setCount(count + 1)} />
        <MemoizedCounter style={MON_STYLE} name={2} count={count} onClick={() => setTimeout(() => {
          setCount(count + 1000);
          }, 2000)} />
        <MemoizedTodo />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

function Counter(props: { name: number, style: Record<string, string>, count: number, onClick: () => void}) {
  console.log(`Rendering Counter #${props.name} during #${appRenderingCount}`)
  return (
    <button onClick={props.onClick} style={props.style}>
      count is {props.count}
    </button>
  )
}

const MemoizedCounter = memo(Counter, (prev, next) => Object.is(prev.count, next.count))


function Toto() {
  console.log(`Rendering Toto during #${appRenderingCount}`)
  return (<span onClick={}>Toto</span>)
}

const MemoizedTodo = memo(Toto)


export default App

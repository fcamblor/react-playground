import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let appRenderingCount = 0;

function App() {
  appRenderingCount++
  console.log(`rendering App #${appRenderingCount}...`)
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
        <Counter initialValue={0} />
        <Counter initialValue={42} />
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

function Counter({ initialValue}: {initialValue: number}) {
  console.log(`rendering Counter (from app rendering count #${appRenderingCount})...`)
  const [count, setCount] = useState(initialValue)

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  )
}

export default App

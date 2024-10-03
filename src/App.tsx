import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let appRenderingCount = 0;

function App() {
  appRenderingCount++
  console.log(`rendering App #${appRenderingCount}...`)
  const [count, setCount] = useState(0)

  const incrementCount = () => setCount(count+1);
  const deferedIncrementCount = () => setTimeout(() => setCount(count+1000), 5000)

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
        <Counter count={count} onClick={incrementCount} />
        <Counter count={count} onClick={deferedIncrementCount} />
        <button onClick={() => fetchPokemons()}>Fetch Pokemons</button>
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

function Counter({ count, onClick }: {count: number, onClick: () => void}) {
  console.log(`rendering Counter (from app rendering count #${appRenderingCount})...`)
  return (
    <button onClick={onClick}>
      count is {count}
    </button>
  )
}

type SpriteName = "back_default" | "front_default"
type Pokemon = {
  id: number
  name: string,
  sprites: Record<SpriteName, string>
}

type PokemonListItem = {
  name: string,
  url: string,
}

async function fetchPokemons(): Promise<Pokemon[]> {
  const pokemonItemResp: {results: PokemonListItem[]} = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000').then(resp => resp.json());
  console.info(pokemonItemResp)
  const pokemons = await Promise.all(pokemonItemResp.results.map(async pokemonItem => fetch(pokemonItem.url).then(resp => resp.json())))
  console.log(pokemons)
  return pokemons;
}

export default App

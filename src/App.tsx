import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let appRenderingCount = 0;

function App() {
  appRenderingCount++
  console.log(`rendering App #${appRenderingCount}...`)
  const [count, setCount] = useState(0)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  const incrementCount = () => setCount(count+1);
  const deferedIncrementCount = () => setTimeout(() => setCount(count+1000), 5000)

  const fetchPokemonsClicked = async () => {
    const pokemons = await fetchPokemons()
    setPokemons(pokemons);
  }

  const movePokemon = (pokemonId: number, endingIndex: number) => {
    const startingIndex = pokemons.findIndex(pk => pk.id === pokemonId)
    if(startingIndex !== -1) {
      const swap = pokemons[endingIndex]
      pokemons[endingIndex] = pokemons[startingIndex]
      pokemons[startingIndex] = swap;
      setPokemons([...pokemons]);
    }
  }

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
        <button onClick={fetchPokemonsClicked}>Fetch Pokemons</button>
        {!!pokemons.length && (
          <dl>
            {pokemons.map((pokemon, idx) => (
              <Pokemon pokemon={pokemon} onUp={() => movePokemon(pokemon.id, (idx+pokemons.length-1)%pokemons.length)} onDown={() => movePokemon(pokemon.id, (idx+pokemons.length+1)%pokemons.length)} ></Pokemon>
            ))}
          </dl>
        )}
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

function Pokemon({ pokemon, onUp, onDown }: { pokemon: Pokemon, onUp: () => void, onDown: () => void }) {
  console.log(`Rendering porkemon #${pokemon.id}`)
  return <>
    <dt>#{pokemon.id} {pokemon.name}
      <button onClick={onUp}>⬆️</button>
      <button onClick={onDown}>⬇️</button>
    </dt>
    <dd><img src={pokemon.sprites.front_default || pokemon.sprites.back_default}/></dd>
  </>
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

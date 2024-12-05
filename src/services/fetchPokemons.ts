export type SpriteName = "back_default" | "front_default"
export type Pokemon = {
  id: number
  name: string,
  sprites: Record<SpriteName, string>
}

type PokemonListItem = {
  name: string,
  url: string,
}

export async function fetchPokemons(): Promise<Pokemon[]> {
  const pokemonItemResp: {results: PokemonListItem[]} = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000').then(resp => resp.json());
  console.info(pokemonItemResp)
  const pokemons = await Promise.all(pokemonItemResp.results.map(async pokemonItem => fetch(pokemonItem.url).then(resp => resp.json())))
  console.log(pokemons)
  return pokemons;
}

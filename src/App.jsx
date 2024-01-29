import { useState } from 'react'
import './App.css'

export default function App() {
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [types, setTypes] = useState([])
  const [stats, setStats] = useState([])
  const [abilities, setAbilities] = useState([])
 
  async function getPokemon() {
    try {
      setLoading(true);

      const pokemon = document.getElementById("pokemon").value.toLower()
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

      if (!response.ok) {
        throw new Error("Could not fetch");
      }

      const data = await response.json();
      
      setPokemonData(data);
      setTypes(data.types.map(type => type.type.name))
      setStats(data.stats.map(stat => ({name: stat.stat.name, value: stat.base_stat})))
      setAbilities(data.abilities.map(ability => ability.ability.name))
    } 
    catch (error) {
      console.error(error);
    } 
    finally {
      setLoading(false);
    }
  }

  const pokemonInfo = (
    <>
      <span><b>Type:</b> {types.join(', ')}</span><br />
      <span><b>Stats:</b> {stats.map(stat => `${stat.name}: ${stat.value}`).join(', ')}</span><br />
      <span><b>Abilities:</b> {abilities.join(', ')}</span>
    </>
  );

  return (
    <>
      <h1>Pokedex Search</h1>
      <div className="display">
        {loading && <p>Loading...</p>}
        {pokemonData && (
          <>
            <img src={pokemonData.sprites.front_default} alt="pokemon" className="pokemonDisplay" />
            <div className="pokemonDescription">
              <h2>Pokemon Info:</h2>
              <div>
                <span>{pokemonInfo}</span>
              </div>
            </div>
          </>
        )}
      </div>
      <br />
      <input id="pokemon" type="text" placeholder="Search Pokemon" />
      <button onClick={getPokemon}>Search Pokemon</button>
    </>
  );
}

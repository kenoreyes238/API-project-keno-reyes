import { useState } from 'react'
import './App.css'

function App() {
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getPokemon() {
    try {
      setLoading(true);

      const pokemon = document.getElementById("pokemon").value
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

      if (!response.ok) {
        throw new Error("Could not fetch");
      }

      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Pokedex Search</h1>
      <div className="display">
        {loading && <p>Loading...</p>}
        {pokemonData && (
          <>
            <img src={pokemonData.sprites.front_default} alt="pokemon image" id="sprite" className="pokemonDisplay" />
            <div id="type" className="pokemonDescription">
              <h2>Type:</h2>
              {pokemonData.types.map(type => (
                <span key={type.slot}>{type.type.name}</span>
              ))}
            </div>
            <div id="stats" className="pokemonDescription">
              <h2>Stats:</h2>
              {pokemonData.stats.map(stat => (
                <div key={stat.stat.name}>
                  <span>{stat.stat.name}:</span>
                  <span>{stat.base_stat}</span>
                </div>
              ))}
            </div>
            <div id="abilities" className="pokemonDescription">
              <h2>Abilities:</h2>
              {pokemonData.abilities.map(ability => (
                <span key={ability.slot}>{ability.ability.name}</span>
              ))}
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

export default App;

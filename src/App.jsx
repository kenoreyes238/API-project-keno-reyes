import './App.css'


function App() {

  async function getPokemon() {
    const pokemon = document.getElementById("pokemon").value

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(response => {
        if(!response.ok) {
          throw new Error("Could not fetch")
        }
        return response.json()
      })
      .then(data => {
        const pokemonImg = data.sprites.front_default
        const imgElement = document.getElementById("sprite")
        // const pokemonAbilities = data.abilities
        // const abilitiesEl = document.getElementById("abilities")

        imgElement.src = pokemonImg
        imgElement.style.display = "block"
        console.log(data)
      })
      .catch(error => console.error(error))
  }



  return (
    <>
      <h1>Pokedex</h1>
      <div>
        <img src="" alt="pokemon image" id="sprite"></img>
        <div id="abilities"></div>
      </div> <br />
      <input id="pokemon" type="text" placeholder="Search Pokemon"></input>
      <button onClick={getPokemon}>Search Pokemon</button>
    </>
    //insert image of pokemon between h1 and input
    //show stats
  )
}

export default App

import './style.css'
import { fetchPokemonsData, fetchTypesData, displayPokemon } from './modules'

document.querySelector('#app').innerHTML = `
  <div>
    <header>
      <nav id="nav" class="container">

      </nav>
    </header>

    <main class="container">
      <div id="lista-pokemons">
      </div>
    </main>

  </div>
`
const listaPokemonsElement = document.querySelector("#lista-pokemons");
const navElement = document.querySelector("#nav");
fetchTypesData(listaPokemonsElement, navElement);
for (let i = 1; i <= 120; i++) {
  fetchPokemonsData(i).then(data => displayPokemon(listaPokemonsElement, data));
}
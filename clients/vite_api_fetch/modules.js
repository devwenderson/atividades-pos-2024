import { capitalize, handleRequestError } from "./functions";

const listaPokemons = document.getElementById("lista-pokemons");
export async function fetchPokemonsData(id_pokemon) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id_pokemon}`);
        // Tratamento de erro
        handleRequestError(response);
        const data = await response.json();
        return data; // Retorna os dados do Pokémon

    } catch (error) {
        console.log("Erro: ", error);
    }
}

export function displayPokemon(element, pokemonData) {
    // Melhora o visual do id do pokemon
    let pokeId = pokemonData.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    // Cria lista com os tipos do pokemon
    let pokeTypes = pokemonData.types.map((type) => `<p class="${type.type.name} type">${type.type.name}</p>`).join("");
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");
    pokemonDiv.innerHTML = `
              <div class="pokemon-infos">
                  <div class="pokemon-img-container">
                      <img src="${pokemonData["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]}" class="pokemon-img">
                  </div>
  
                  <div class="pokemon-name-container">
                      <p class="pokemon-id">#${pokeId}</p>
                      <h4 class="pokemon-name">${capitalize(pokemonData.name)}</h4>
                  </div>
  
                  <div class="pokemon-types">
                      ${pokeTypes}
                  </div>
              </div>
          `;
    element.appendChild(pokemonDiv);
}

export async function fetchTypesData(element, navElement) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/`);
        // Tratamento de erro
        handleRequestError(response);
        const data = await response.json();

        // Cria um botão para exibir todos os pokemons
        let filterButton = document.createElement("button");
        filterButton.classList.add("button");
        filterButton.textContent = "Todos";
        const filterButtonId = "todos-pokemons";
        filterButton.id = filterButtonId;
        filterButton.onclick = () => filterByType(element, "all");
        navElement.appendChild(filterButton);

        // Cria filtro de busca por tipo de pokemon
        data.results.forEach((type) => {
            let filterButton = document.createElement("button");
            filterButton.classList.add(`${type.name}`, "button");
            filterButton.textContent = `${type.name}`;
            const filterButtonId = `${type.name}`;
            filterButton.id = filterButtonId;
            filterButton.onclick = () => filterByType(element, type.name);
            navElement.appendChild(filterButton);
        });

    } catch (error) {
        console.log("Erro: ", error);
    }
}

async function filterByType(element, type) {
    element.innerHTML = "";

    if (type === "all") {
        // Carrega todos os Pokémons
        for (let i = 1; i <= 120; i++) {
            fetchPokemonsData(i).then(data => displayPokemon(element, data));
        }
    } else {
        // Filtra por tipo
        for (let i = 1; i <= 120; i++) {
            const data = await fetchPokemonsData(i); 
            const isTypeMatch = data.types.some(t => t.type.name === type);
            if (isTypeMatch) {
                displayPokemon(element, data);
            }
        }
    }
}
const listaPokemons = document.getElementById("lista-pokemons");
async function fetchPokemonsData(id_pokemon) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id_pokemon}`
    );

    // Tratamento de erro
    handleRequestError(response);
    const data = await response.json();
    console.log(data)

    // Melhora o visual do id do pokemon
    let pokeId = data.id.toString();
    if (pokeId.length === 1) {
      pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
      pokeId = "0" + pokeId;
    }

    // Cria lista com os tipos do pokemon
    let pokeTypes = data.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join("");

    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");
    pokemonDiv.innerHTML = `
            <div class="pokemon-infos">
                <img src="${
                  data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
                }" 
                class="pokemon-img"
                >

                <div class="pokemon-name-container">
                    <p class="pokemon-id">#${pokeId}</p>
                    <h4 class="pokemon-name">${capitalize(data.name)}</h4>
                </div>

                <div class="pokemon-types">
                    ${pokeTypes}
                </div>
            </div>
        `;
    listaPokemons.appendChild(pokemonDiv);
  } catch (error) {
    console.log("Erro: ", error);
  }
}

async function fetchTypesData() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/`);
    // Tratamento de erro
    handleRequestError(response);
    const data = await response.json();

    // Cria filtro de busca por tipo de pokemon
    let nav = document.getElementById("nav");
    data.results.forEach((type) => {
      let filterButton = document.createElement("button");
      filterButton.classList.add(`${type.name}`, "button");
      filterButton.textContent = `${type.name}`;
      nav.appendChild(filterButton);
    });
  } catch (error) {
    console.log("Erro: ", error);
  }
}

function handleRequestError(response) {
  if (!response.ok) {
    throw new Error("Erro: " + response.status);
  }
}

// Capitaliza a primeira letra do nome
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

window.onload = () => {
  fetchTypesData();
  // for (let i = 1; i <= 120; i++) {
  //     fetchPokemonsData(i);
  // }
  fetchPokemonsData(1);
};

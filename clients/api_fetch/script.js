const listaPokemons = document.getElementById("lista-pokemons");

async function fetchPokemonsData(id_pokemon) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id_pokemon}`
    );
    // Tratamento de erro
    handleRequestError(response);
    const data = await response.json();
    return data;
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

    let nav = document.getElementById("nav");

    // Cria um botão para exibir todos os pokemons
    let filterButton = document.createElement("button");
    filterButton.classList.add("button");
    filterButton.textContent = "Todos";
    filterButtonId = "todos-pokemons";
    filterButton.id = filterButtonId;
    filterButton.onclick = () => filterByType(filterButtonId);
    nav.appendChild(filterButton);

    // Cria filtro de busca por tipo de pokemon
    data.results.forEach((type) => {
      let filterButton = document.createElement("button");
      filterButton.classList.add(`${type.name}`, "button");
      filterButton.textContent = `${type.name}`;
      filterButtonId = `${type.name}`;
      filterButton.id = filterButtonId;
      filterButton.onclick = () => filterByType(filterButtonId);
      nav.appendChild(filterButton);
    });
  } catch (error) {
    console.log("Erro: ", error);
  }
}

function exibirPokemons(data) {
  // Melhora o visual do id do pokemon
  let pokeId = data.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  // Cria lista com os tipos do pokemon
  let pokeTypes = data.types
    .map((type) => `<p class="${type.type.name} type">${type.type.name}</p>`)
    .join("");

  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");
  pokemonDiv.innerHTML = `
    <div class="pokemon-infos">
        <div class="pokemon-img-container">
            <img src="${
              data["sprites"]["versions"]["generation-v"]["black-white"][
                "animated"
              ]["front_default"]
            }" class="pokemon-img">
        </div>

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
}

async function filterByType(buttonId) {
  if (buttonId == "todos-pokemons") {
    alert("oi")
    for (let i = 1; i <= 120; i++) {
        const data = await fetchPokemonsData(i);
        console.log(data)
        exibirPokemons(data);
    }
  } else {
    // Filtra por tipo
    for (let i = 1; i <= 120; i++) {
      const data = await fetchPokemonsData(i);
      const types = data.types.map((type) => type.type.name);
      if (types.some((type) => type.includes(buttonId))) {
        exibirPokemons(data);
      }
    }
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
  for (let i = 1; i <= 120; i++) {
    fetchPokemonsData(i).then((data) => exibirPokemons(data));
  }
};

const listaPokemons = document.getElementById("lista-pokemons");
async function fetchPokemonsData(id_pokemon) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id_pokemon}`);
        // Tratamento de erro
        handleRequestError(response);
        const data = await response.json();
        // console.log(data);

        const pokemonDiv = document.createElement("div");
        pokemonDiv.classList.add("pokemon");
        pokemonDiv.innerHTML = `
            <div class="pokemon-infos">
                <h4>${data.name}</h4>
            </div>
        `;
        listaPokemons.appendChild(pokemonDiv);

    } catch (error) {
        console.log("Erro: ", error)
    }
};

async function fetchTypesData() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/`);
        // Tratamento de erro
        handleRequestError(response);
        const data = await response.json();

        // Cria filtro de busca por tipo de pokemon
        let nav = document.getElementById("nav");
        data.results.forEach(type => {
            let filterButton = document.createElement("button");
            filterButton.classList.add(`${type.name}`, 'button')
            filterButton.textContent = `${type.name}`
            nav.appendChild(filterButton);
        });
    } catch (error) {
        console.log("Erro: ", error)
    }
};

function handleRequestError (response) {
    if (!response.ok) {
        throw new Error("Erro: " + response.status )
    }
};

window.onload = () => {
    fetchTypesData();
    for (let i = 1; i <= 120; i++) {
        fetchPokemonsData(i);
    }
};


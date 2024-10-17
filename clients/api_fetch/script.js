var pokemon_atual = 1
async function fetchPokemonsData(id_pokemon) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id_pokemon}`);
        // Tratamento de erro
        if (!response.ok) {
            throw new Error("Erro: " + response.status )
        }
        const data = await response.json();
        // console.log(data);
    } catch (error) {
        console.log("Erro: ", error)
    }
};

async function fetchTypesData() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/`);
        // Tratamento de erro
        if (!response.ok) {
            throw new Error("Erro: " + response.status )
        }
        const data = await response.json();

        // Cria filtro de busca por tipo de pokemon
        let searchByTypeElement = document.getElementById("search-by-type");
        data.results.forEach(type => {
            let searchOption = document.createElement("option");
            searchOption.innerHTML = `
                <option value="${type.name}">${type.name}</option>
            `;
            searchByTypeElement.appendChild(searchOption);
        });
        console.log(data.results);
    } catch (error) {
        console.log("Erro: ", error)
    }
}

window.onload = () => {
    fetchTypesData();
}


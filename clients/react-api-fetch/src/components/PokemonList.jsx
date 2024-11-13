import React from 'react';
import { useFetchPokemons } from './useFetchPokemon'; // Importando o hook
import './PokemonList.module.css';

// Função para capitalizar o nome do Pokémon (primeira letra maiúscula)
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function PokemonList() {
  const { pokemonsData, isLoading, error } = useFetchPokemons(120);

  if (isLoading) {
    return <p>Carregando Pokémons...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Erro: {error}</p>;
  }

  if (!pokemonsData || pokemonsData.length === 0) {
    return <p>Pokémons não encontrados.</p>;
  }

  // Função para melhorar o visual do id do pokemon (com 3 dígitos)
  const formatPokeId = (id) => {
    let pokeId = id.toString();
    if (pokeId.length === 1) {
      pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
      pokeId = "0" + pokeId;
    }
    return pokeId;
  };

  return (
    <div className="pokemon-list">
      <div className="pokemon-grid">
        {pokemonsData.map((pokemon) => {
          const pokeId = formatPokeId(pokemon.id);
          const pokeTypes = pokemon.types.map((type) => (
            <p key={type.type.name} className={`${type.type.name} type`}>{type.type.name}</p>
          ));

          return (
            <div key={pokemon.id} className="pokemon">
              <div className="pokemon-infos">
                <div className="pokemon-img-container">
                  <img 
                    src={pokemon.sprites.versions['generation-v']['black-white']['animated']['front_default']} 
                    alt={pokemon.name} 
                    className="pokemon-img"
                  />
                </div>

                <div className="pokemon-name-container">
                  <p className="pokemon-id">#{pokeId}</p>
                  <h4 className="pokemon-name">{capitalize(pokemon.name)}</h4>
                </div>

                <div className="pokemon-types">
                  {pokeTypes}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonList;

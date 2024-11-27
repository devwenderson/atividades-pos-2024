import React, { useState } from 'react';
import { useFetchPokemons } from './useFetchPokemon';
import styles from './PokemonList.module.css';

// Função para capitalizar o nome do Pokémon (primeira letra maiúscula)
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function PokemonList() {
  const { pokemonsData, isLoading, error } = useFetchPokemons(151);
  const [selectedType, setSelectedType] = useState('all');

  if (isLoading) {
    return (
      <div className={styles['loading-message-container']}>
        <p className={styles['loading-message']}>Carregando Pokémons...</p>
      </div>
    );
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

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  // Filtragem dos pokémons pelo tipo selecionado
  const filteredPokemons = pokemonsData.filter((pokemon) => {
    if (selectedType === 'all') {
      return true
    };
    return pokemon.types.some((type) => type.type.name === selectedType);
  });

  const types = [
    { value: 'all', label: 'Todos' },
    { value: 'normal', label: 'Normal' },
    { value: 'fire', label: 'Fogo' },
    { value: 'water', label: 'Água' },
    { value: 'grass', label: 'Grama' },
    { value: 'electric', label: 'Elétrico' },
    { value: 'ice', label: 'Gelo' },
    { value: 'fighting', label: 'Luta' },
    { value: 'poison', label: 'Venenoso' },
    { value: 'ground', label: 'Terra' },
    { value: 'flying', label: 'Voador' },
    { value: 'psychic', label: 'Psíquico' },
    { value: 'bug', label: 'Inseto' },
    { value: 'rock', label: 'Pedra' },
    { value: 'ghost', label: 'Fantasma' },
    { value: 'dark', label: 'Sombrio' },
    { value: 'dragon', label: 'Dragão' },
    { value: 'steel', label: 'Aço' },
    { value: 'fairy', label: 'Fada' }
  ];

  return (
    <div className={styles['pokemon-list']}>
      {/* Menu de Botões para Filtro por Tipo */}
      <div className={styles['filter-container']}>
        <div className={styles['button-group']}>
          {types.map((type) => (
            <button
              onClick={() => setSelectedType(type.value)}
              className={`${styles[type.value]} ${styles.filterButton} ${selectedType === type.value ? styles.selected : ''}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles['pokemon-grid']}>
        {filteredPokemons.length === 0 ? (
          <div className={styles['error-message-container']}>
            <p className={styles['error-message']}>Pokemons não encontrados</p>
          </div>
        ) : filteredPokemons.map((pokemon) => {
          const pokeId = formatPokeId(pokemon.id);
          const pokeTypes = pokemon.types.map((type) => (
            <p key={type.type.name} className={`${styles[type.type.name]} ${styles.type}`}>
              {type.type.name}
            </p>
          ));

          return (
            <div key={pokemon.id} className={styles.pokemon}>
              <div className={styles['pokemon-infos']}>
                <div className={styles['pokemon-img-container']}>
                  <img
                    src={pokemon.sprites.versions['generation-v']['black-white']['animated']['front_default']}
                    alt={pokemon.name}
                    className={styles['pokemon-img']}
                  />
                </div>

                <div className={styles['pokemon-name-container']}>
                  <p className={styles['pokemon-id']}>#{pokeId}</p>
                  <h4 className={styles['pokemon-name']}>{capitalize(pokemon.name)}</h4>
                </div>

                <div className={styles['pokemon-types']}>
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

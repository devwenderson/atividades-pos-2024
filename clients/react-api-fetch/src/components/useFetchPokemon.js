import { useState, useEffect } from 'react';

// Função para tratar erro de requisição
function handleRequestError(response) {
  if (!response.ok) {
    throw new Error('Falha na requisição para a PokeAPI');
  }
}

// Hook customizado para buscar dados de múltiplos Pokémons
export function useFetchPokemons(limit = 120) {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonsData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Requisição para pegar os 120 primeiros Pokémons (IDs de 1 a 120)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        
        handleRequestError(response);
        const { results } = await response.json();
        
        // Agora, para cada Pokémon, buscamos os dados detalhados
        const detailedPokemons = await Promise.all(
          results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            handleRequestError(res);
            return res.json();
          })
        );

        setPokemonsData(detailedPokemons);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonsData(); // Chama a função para buscar os dados
  }, [limit]);

  return { pokemonsData, isLoading, error };
}

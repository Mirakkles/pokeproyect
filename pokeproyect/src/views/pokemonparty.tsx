import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const PokemonGrid: React.FC = () => {
  const navigate = useNavigate(); 
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/pokemon');
        setPokemonList(response.data); 
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handlePokemonClick = (id: string) => {
    navigate(`/pokemon/${id}`);
  };


  if (loading) {
    return <p>Loading Pokémon...</p>;
  }

  if (pokemonList.length === 0) {
    return <h1>You haven't captured any Pokémon yet!</h1>;
  }

  return (<>
    <Header title="Pokemon Party" />
    <div className="pokemon-grid">
      
      {pokemonList.map((pokemon) => (
        <div key={pokemon.id} className="pokemon-card">
          <p>ID: {pokemon.id}</p>
          <img src={pokemon.image} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
        </div>
      ))}
    </div>
    </>
  );
};

export default PokemonGrid;

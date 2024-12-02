import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

interface CaughtPokemon {
  name: string;
  image: string;
}

const PCBox: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<CaughtPokemon[]>([]);

  useEffect(() => {
    const storedPokemons = localStorage.getItem('caughtPokemons');
    if (storedPokemons) {
      setPokemonList(JSON.parse(storedPokemons));
    }
  }, []);

  if (pokemonList.length === 0) {
    return (
      <>
        <Header title="PC Box" />
        <h1>No Pokémon found in PC Box.</h1>
      </>
    );
  }

  return (
    <>
      <Header title="PC Box" />
      <div className="pokemon-grid">
        {pokemonList.map((poke, index) => (
          <div key={index} className="pokemon-card">
            <img src={poke.image} alt={poke.name} />
            <h3>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1).toLowerCase()}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default PCBox;
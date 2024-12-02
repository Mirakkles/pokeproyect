// Pokemon.tsx (List View)
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemonByType } from '../redux/pokemonSlice.ts';
import { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Header.tsx';
import axios from 'axios';

const Pokemon: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { data: pokemonData, loading, error } = useSelector(
    (state: RootState) => state.pokemon
  );

  const typeMapping: { [key: string]: string } = {
    Normal: 'normal',
    Fire: 'fire',
    Water: 'water',
    Grass: 'grass',
    Electric: 'electric',
    Poison: 'poison',
    Ground: 'ground',
    Bug: 'bug',
    Psychic: 'psychic',
    Ice: 'ice'
  };

  const catchPokemon = async (name: string, image: string, type: string) => {
    try {
      const response = await axios.get('http://localhost:4000/api/pokemon');
      const caughtPokemons = response.data;
      
      if (caughtPokemons.length >= 6) {
        
        const existingPokemon = JSON.parse(localStorage.getItem('caughtPokemons') || '[]');
        
        existingPokemon.push({ name, image, type });
        localStorage.setItem('caughtPokemons', JSON.stringify(existingPokemon));
        
        alert(`${name} saved to PC Box, because you exceeded the limit!`);
      } else {
        
        await axios.post('http://localhost:4000/api/catch', {
          name,
          image,
          type,
        });
        alert(`${name} capturado!`);
      }
    } catch (error) {
      console.error('Error al capturar el Pokémon:', error);
    }
  };

  const [selectedType, setSelectedType] = useState<string>('normal'); 


  useEffect(() => {
    (dispatch as AppDispatch)(fetchPokemonByType(selectedType));
  }, [dispatch, selectedType]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const typeInSpanish = event.target.value;
    setSelectedType(typeMapping[typeInSpanish] || 'normal');
  };

  const handlePokemonClick = (id: string) => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <>
      <Header title="Wild Pokemon" />
      <div style={{ padding: '20px' }}>
        <h2>Select a Pokemon Type</h2>

        <select
          id="typeSelect"
          onChange={handleTypeChange}
          value={
            Object.keys(typeMapping).find((key) => typeMapping[key] === selectedType) || 'Normal'
          }
          style={{ width: '200px', height: '40px' }} 
        >
          <option>Normal</option>
          <option>Fire</option>
          <option>Water</option>
          <option>Grass</option>
          <option>Electric</option>
          <option>Poison</option>
          <option>Ground</option>
          <option>Bug</option>
          <option>Psychic</option>
          <option>Ice</option>
        </select>

        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}

        {pokemonData && pokemonData.pokemon && (
          <div>
            <h3>List of {selectedType.toUpperCase()} Pokemon:</h3>
            <ul>
              {pokemonData.pokemon.map((poke: any, index: number) => {
                const pokemonId = poke.pokemon.url.split('/')[6]; 
                const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`; // URL de la imagen

                return (
                  <li
                    key={index}
                    style={{ display: 'flex', alignItems: 'center' }}
                    onClick={() => handlePokemonClick(pokemonId)}
                  >
                    <img
                      src={pokemonImageUrl}
                      alt={poke.pokemon.name}
                      style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    />
                    <h2>{poke.pokemon.name.charAt(0).toUpperCase() + poke.pokemon.name.slice(1).toLowerCase()}</h2>
                    <button style={{ width: '100px', height: '40px', marginLeft: '20px' }} onClick={() =>
                    catchPokemon(poke.pokemon.name, pokemonImageUrl, selectedType)
                  } >Catch It!</button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Pokemon;

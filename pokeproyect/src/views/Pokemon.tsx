import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetail: React.FC = () => {
  const { id } = useParams(); // Get the Pokémon ID from the URL
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('El pedido no se logro completar');
        }
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error al traer datos:", error);
      }
    };

    fetchData();
  }, [id]); // Fetch data when the id changes

  return (
    <div className="pokemon-detail-container">
      {pokemon ? (
        <div className="pokemon-detail-content">
          <h2>{pokemon.name.toUpperCase()}</h2>
          <div className="container">
            <div className="card">
              <div className="row">
                <div className="col-sm-5">
                  <img
                    className="card-img"
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt="Pokemon"
                  />
                </div>
                <div className="col-sm-7">
                  <div className="card-body">
                    <h5 className="card-title">{pokemon.name.toUpperCase()}</h5>
                    <p className="card-text">HP: {pokemon.stats[0].base_stat}</p>
                    <p className="card-text">Ataque: {pokemon.stats[1].base_stat}</p>
                    <p className="card-text">Defensa: {pokemon.stats[2].base_stat}</p>
                    <p className="card-text">Ataque Especial: {pokemon.stats[3].base_stat}</p>
                    <p className="card-text">Defensa Especial: {pokemon.stats[4].base_stat}</p>
                    <p className="card-text">Velocidad: {pokemon.stats[5].base_stat}</p>
                    <p className="card-text">Tipo: {pokemon.types[0].type.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>...Loading</p>
      )}
    </div>
  );
};

export default PokemonDetail;

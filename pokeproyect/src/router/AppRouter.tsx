import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar.tsx';
import Home from '../views/Home.tsx'
import Pokemon from '../views/Pokemon.tsx';
import WildPokemon from '../views/wildpokemon.tsx'
import PokemonParty from '../views/pokemonparty.tsx'
import PcBox from '../views/pcbox.tsx'
import React from 'react';

interface RouteType {
  to: string;
  linkText: string;
}

const AppRouter: React.FC = () => {
  // Defining the routes
  const routes: RouteType[] = [
    { to: '/', linkText: 'Home' },
    { to: '/busqueda', linkText: 'Busqueda' },
    { to: '/wildpokemon', linkText: 'Wild Pokemon' },
    { to: '/pokemonparty', linkText: 'Pokemon Party' },
    { to: '/pcbox', linkText: 'PC Box' },
  ];

  return (
    <>
      <Sidebar className="sidebar-class" /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
        <Route path="/wildpokemon" element={<WildPokemon />} />
        <Route path="/pokemonparty" element={<PokemonParty />} />
        <Route path="/pcbox" element={<PcBox />} />
      </Routes>

    </>
  );
};

export default AppRouter;
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  className: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <nav className={`sidebar ${className}`}>

      <div className="sidebar-logo">
        <img 
          src="https://i.pinimg.com/736x/6a/28/0d/6a280de1554a66e8ddc2c80b2df3b598.jpg" 
          alt="Pokemon Logo" 
          className="logo" 
        />
      </div>

      <ul>
        <li><Link to="/wildpokemon">Wild Pokemon</Link></li>
        <li><Link to="/pokemonparty">Pokemon Party</Link></li>
        <li><Link to="/pcbox">PC Box</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;

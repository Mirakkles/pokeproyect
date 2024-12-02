
import React from 'react';
import './Sidebar.css';

interface HeaderProps {
  title: string; 
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;

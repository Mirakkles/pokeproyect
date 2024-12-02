import React from 'react';
import './App.css';
import AppRouter from './router/AppRouter.tsx';
import Sidebar from './components/Sidebar.tsx'
import Header from './components/Header.tsx';
import WindowButtons from './components/WindowsButtons.tsx';

const App: React.FC = () => {
  return (
    <div>
      {/* Sidebar con un ancho fijo de 200px */}
      <Sidebar className="sidebar" />
      <Header title="Mi Aplicación de Pokemon" />
      <WindowButtons />

      {/* Contenido principal con margen a la izquierda de 200px */}
      <div style={{ marginLeft: '200px', padding: '20px', marginTop: '100px'}}>
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
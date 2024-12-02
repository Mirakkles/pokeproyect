import React from 'react';

const WindowButtons: React.FC = () => {
  const handleMinimize = () => window.electron.minimize();
  const handleMaximize = () => window.electron.maximize();
  const handleClose = () => window.electron.close();

  return (
    <div className="window-buttons">
      <button onClick={handleMinimize}>Minimize</button>
      <button onClick={handleMaximize}>Maximize</button>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default WindowButtons;

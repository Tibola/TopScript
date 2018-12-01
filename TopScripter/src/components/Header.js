import React from 'react';
import './Header.css';

const Header = ({openFolder, devTools, openTerminal, minimize, maximize, close, currentFolder, onBuildAndRun, onBuild, onRun, onSaveAll}) => (
  <div className="Header">
    <div className="WindowButtons">
      {/* <button className="Close" onClick={close}>x</button>
      <button className="Minimize" onClick={minimize}>-</button>
      <button className="Maximize" onClick={maximize}>+</button> */}
    </div>
    <button title="Abrir diretório" onClick={openFolder}>📂</button>
    <button title="Ferramentas de desenvolvedor" onClick={devTools}>🖥</button>
    <button title="Terminal" onClick={openTerminal}>👩‍💻</button>
    <button title="Build" onClick={onBuild}>⚙️</button>
    <button title="Executar" onClick={onRun}>▶️</button>
    <button title="Salvar todos" onClick={onSaveAll}>💾</button>
    {currentFolder}
  </div>
)

export default Header;

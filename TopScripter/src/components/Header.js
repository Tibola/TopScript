import React from 'react';
import './Header.css';

const Header = ({openFolder, devTools, openTerminal, minimize, maximize, close, currentFolder, onBuildAndRun, onBuild, onRun, onSaveAll}) => (
  <div className="Header">
    <div className="WindowButtons">
      {/* <button className="Close" onClick={close}>x</button>
      <button className="Minimize" onClick={minimize}>-</button>
      <button className="Maximize" onClick={maximize}>+</button> */}
    </div>
    <div className="Header_holder">
      <div>
        <button title="Abrir diretório" onClick={openFolder}>📂</button>
        <button title="Ferramentas de desenvolvedor" onClick={devTools}>🖥</button>
        <button title="Terminal" onClick={openTerminal}>👩‍💻</button>
        <button title="Build" onClick={onBuild}>👷🏻‍♂️</button>
        <button title="Executar" onClick={onRun}>🏃‍♂️</button>
        <button title="Salvar todos" onClick={onSaveAll}>👼</button>
      </div>
    <span>{currentFolder}</span>
    </div>
  </div>
)

export default Header;

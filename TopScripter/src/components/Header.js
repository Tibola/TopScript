import React from 'react';
import './Header.css';

const Header = ({openFolder, devTools, openTerminal, minimize, maximize, close, currentFolder, onBuildAndRun, onBuild, onRun, onSaveAll}) => (
  <div className="Header">
    <div className="WindowButtons">
      {/* <button className="Close" onClick={close}>x</button>
      <button className="Minimize" onClick={minimize}>-</button>
      <button className="Maximize" onClick={maximize}>+</button> */}
    </div>
    <button onClick={openFolder}><i className="fas fa-folder"></i></button>
    <button onClick={devTools}><i className="fab fa-dev"></i></button>
    <button onClick={openTerminal}><i className="fas fa-terminal"></i></button>
    <button onClick={onBuild}><i className="fas fa-cogs"></i></button>
    <button onClick={onRun}><i className="fas fa-play"></i></button>
    <button onClick={onSaveAll}><i className="fas fa-play"></i></button>
    {currentFolder}
  </div>
)

export default Header;

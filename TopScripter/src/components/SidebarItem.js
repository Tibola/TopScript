import React from 'react';
import './SidebarItem.css';


const SidebarItem = ({name, onSelectItem, openFile}) => (
  <li className={`SidebarItem ${(openFile ? 'SidebarItem--Open': '')}`}>
    <button onClick={() => onSelectItem(name)}>
      {name}
      <div className="SidebarItem--InMemory">{`${(openFile ? '⭐️': '')}`}</div>
    </button>
  </li>
)

export default SidebarItem;

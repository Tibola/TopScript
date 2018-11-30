import React from 'react';
import './Sidebar.css';
import SidebarItem from './SidebarItem';


const Sidebar = ({files, onSelectItem, openFiles}) => (
  <div className="Sidebar">
    <ul>
      {
        files.map((file, index) => 
          <SidebarItem key={index} name={file} onSelectItem={onSelectItem} openFile={openFiles[file]} />
        )
      }
    </ul>
  </div>
)

export default Sidebar;

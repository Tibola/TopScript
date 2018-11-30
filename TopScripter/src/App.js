import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header'
import Terminal from './components/Terminal';
import Editor from './components/Editor';

// installa os devtools do react no electron
// require('electron-react-devtools').install()
const {dialog, BrowserWindow} = window.require('electron').remote;
const fs = window.require('fs');

class App extends Component {
  state = {
    folder: null,
    files: [],
    currentFile: {
      name: null,
      data: null
    },
    filesEditor: {},
    mostraTerminal: false
  }

  constructor(props) {
    super(props)

    this.openFolder = this.openFolder.bind(this)
    this.onSelectItem = this.onSelectItem.bind(this)
  }

  openFolder = () => {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, folder => {
      if (folder !== undefined) {
        this.setState({folder: folder[0]})
        fs.readdir(folder[0], (err, dir) => {
          this.setState({files: dir})
        });
      }
    });
  }

  minimize = () => {
    var window = BrowserWindow.getFocusedWindow();
    window.minimize(); 
  }
  
  maximize = () => {
    var window = BrowserWindow.getFocusedWindow(); 
    window.isMaximized() ? window.restore() : window.maximize(); 
  }
  
  close = () => {
    var window = BrowserWindow.getFocusedWindow();
    window.close();
  }
  
  openTerminal = () => {
    this.setState({mostraTerminal: !this.state.mostraTerminal})
  }

  onBuild = () => {
    alert("Nao implementado HU3")
  }

  onBuildAndRun = () => {
    alert("Nao implementado HU3")
  }

  onRun = () => {
    alert("Nao implementado HU3")
  }

  devTools = () => {
    window.require('electron').remote.getCurrentWindow().toggleDevTools();
  }

  onSelectItem = name => {
    const filename = `${this.state.folder}/${name}`;
    const stats = fs.statSync(filename);

    // se for maior do que 500 KB, foda-se
    if (stats.size > 500000) {
      alert(`Carai, essa porra tem ${stats.size} bytes, não vo le essa merda não`)
    } else {
      // se ele já existe, abrir da memória
      if (this.state.filesEditor[name]) {
        this.setState({currentFile: name})
      } else {
        // senão vai ter que abrir
        fs.readFile(filename, 'utf8', (err, data) => {
          if (err) {
            alert(err);
          } else {
            this.setState({
              currentFile: name,
              filesEditor: {
                ...this.state.filesEditor,
                [name]: {
                  name: name,
                  data: data
                }
              }
            })
          }
        });
      }
    }
  }

  editFile = (data) => {
    const { filesEditor, currentFile } = this.state

    this.setState({
      filesEditor: {
        ...filesEditor,
        [currentFile]: {
          name: currentFile,
          data: data
        }
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Header 
          openFolder={this.openFolder} 
          devTools={this.devTools} 
          openTerminal={this.openTerminal}
          currentFolder={this.state.folder}
          onBuild={this.onBuild}
          onBuildAndRun={this.onBuildAndRun}
          onRun={this.onRun}
          minimize={this.minimize}
          maximize={this.maximize}
          close={this.close}
        />
        <div className="Body">
          <Sidebar files={this.state.files} openFiles={this.state.filesEditor} onSelectItem={this.onSelectItem} />
          <Editor file={this.state.filesEditor[this.state.currentFile]} editFile={this.editFile} />
        </div>
        <Terminal mostraTerminal={this.state.mostraTerminal} closeTerminal={this.openTerminal} />
      </div>
    );
  }
}

export default App;

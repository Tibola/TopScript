import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header'
import Terminal from './components/Terminal';
import Editor from './components/Editor';
import Notificacao from './components/Notificacao';
import { tussi } from './utils/destopificador';

// installa os devtools do react no electron
// require('electron-react-devtools').install()
const {dialog, BrowserWindow, globalShortcut} = window.require('electron').remote;
const fs = window.require('fs');
const exec = window.require('child_process').exec;

class App extends Component {
  state = {
    folder: null,
    files: [],
    currentFile: null,
    filesEditor: {},
    mostraTerminal: false,
    notificacao: null,
    command: '',
    history: [],
    posicaoCagada: {
      lin: null,
      col: null
    }
  }

  constructor(props) {
    super(props)

    this.openFolder = this.openFolder.bind(this)
    this.onSelectItem = this.onSelectItem.bind(this)
    this.setNotificacao = this.setNotificacao.bind(this)
    this.executarComando = this.executarComando.bind(this)
  }

  openFolder = () => {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, folder => {
      if (folder !== undefined) {
        this.setState({folder: folder[0]})
        fs.readdir(folder[0], (err, dir) => {
          if (!err) {
            this.setState({files: dir})
          } else {
            this.setNotificacao(err.message)
          }
        });
      } else {
        this.setNotificacao('nenhuma pasta selecionada 😢')
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
    this.setState({mostraTerminal: true})
    // console.log(this.state)
    const filename = `${this.state.folder}/${this.state.currentFile}`;

    const comando = `java -classpath topscriptc/bin topscript/TopScript < ${filename}`
    // console.log(comando)
    this.executarComando(comando)
  }

  onBuildAndRun = () => {
    alert("Nao implementado HU3")
  }

  onRun = () => {
    let data = tussi(this.state.filesEditor[this.state.currentFile].data);
    const filename = `${this.state.folder}/${this.state.currentFile}.js`;

    fs.writeFile(filename, data, {encoding: 'utf8'}, (err) => {
      if(err) {
        // alert(err)
        this.setNotificacao(err.message)
      } else {
        // console.log("The file was saved!")
        this.setNotificacao('Arquivo Transpilado para JS')

        this.setState({mostraTerminal: true})
    
        this.executarComando(`node ${filename}`)
      }
    })
    // alert("Nao implementado HU3")
  }

  devTools = () => {
    window.require('electron').remote.getCurrentWindow().toggleDevTools();
  }

  onSelectItem = name => {
    const filename = `${this.state.folder}/${name}`;
    const stats = fs.statSync(filename);

    // se for maior do que 500 KB, foda-se
    if (stats.size > 500000) {
      this.setNotificacao(`Carai 🤬😡😤, essa porra 🤢🤮 tem 👉👉 ${stats.size} 👈👈 bytes 👎👎, não ❌ vo le 📝👨‍💻 essa merda 💩💩 não 🚫`)
    } else {
      // se ele já existe, abrir da memória
      if (this.state.filesEditor[name]) {
        this.setState({currentFile: name})
      } else {
        // senão vai ter que abrir
        fs.readFile(filename, 'utf8', (err, data) => {
          if (err) {
            this.setNotificacao(err.message)
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

    // let dataNoTab = data.replace(/\t/g, '  ')
    
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

  onSaveAll = () => {
    const { filesEditor } = this.state
    // console.log(filesEditor)

    Object.values(filesEditor).forEach(file => {
      const filename = `${this.state.folder}/${file.name}`

      fs.writeFile(filename, file.data, {encoding: 'utf8'}, (err) => {
        if(err) {
          // alert(err)
          this.setNotificacao(err.message)
        } else {
          // console.log("The file was saved!")
          this.setNotificacao('Arquivo salvo! 👼')
        }
      })
    })
  }

  executarComando(comando) {
    exec(comando, {encoding: 'utf8'}, (code, stdout, stderr) => {
      this.setState({
        history: [
          ...this.state.history,
          {
            command: comando,
            code: code,
            stdout: stdout,
            stderr: stderr
          }
        ],
        command: ''
      })

      let linha = stdout.split("\n").filter(linha => 
        (linha.startsWith('Encontrado')))

      if (!linha.length) {
        linha = stderr.split("\n").filter(linha => 
          (linha.startsWith('Erro')))
      }

      if (linha.length) {
        let lin = linha[0].match("linha (.*),")
        let col = linha[0].match("coluna (.*).")
        if (lin.length && col.length) {
          this.setState({
            posicaoCagada: { lin: parseInt(lin[1]), col: parseInt(col[1]) }
          })
        }
      } else {
        this.setState({
          posicaoCagada: { lin: null, col: null }
        })
      }

      var element = document.getElementById("history")
      element.scrollTop = element.scrollHeight
    })
  }

  setNotificacao = notificacao => {
    this.setState({notificacao})
    setTimeout(() => this.setState({notificacao: ''}), 3000)
  }

  componentDidMount() {
    globalShortcut.register('CommandOrControl+S', () => {
      this.onSaveAll()
    })

    globalShortcut.register('F5', () => {
      this.onSaveAll()
      this.onBuild()
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
          onSaveAll={this.onSaveAll}
        />
        <div className="Body">
          <Sidebar 
            files={this.state.files} 
            openFiles={this.state.filesEditor} 
            onSelectItem={this.onSelectItem} />
          <Editor 
            file={this.state.filesEditor[this.state.currentFile]} 
            editFile={this.editFile} 
            posicaoCagada={this.state.posicaoCagada} />
        </div>
        <Notificacao texto={this.state.notificacao} />
        <Terminal 
          mostraTerminal={this.state.mostraTerminal} 
          closeTerminal={this.openTerminal} 
          executarComando={this.executarComando} 
          history={this.state.history} />
      </div>
    );
  }
}

export default App;

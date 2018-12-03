import React from 'react';
import './Terminal.css';

var unescapeJs = require('unescape-js');

class Terminal extends React.Component {
  constructor(props) {
    super(props)

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  state = {
    command: ''
  }

  handleKeyPress = event => {
    if(event.key === 'Enter') {
      this.props.executarComando(this.state.command)
    }
  }

  render() {
    const {mostraTerminal, closeTerminal} = this.props

    return (
      <div className={`Terminal ${mostraTerminal && `Amostra`}`}>
        <div className="History" id="history">
          {
            this.props.history.map((line, key) => 
              <div className="row" key={key}>
                <pre>{line.command}</pre>
                <pre>{unescapeJs(line.stdout)}</pre>
                <pre>{line.stderr}</pre>
              </div>
            )
          }
        </div>
        <input 
        type="text" 
        className="Stdin" 
        value={this.state.command} 
        onKeyPress={this.handleKeyPress} 
        onChange={event => {this.setState({command:event.target.value})} }/>
        {
          mostraTerminal &&
          <button className="Terminal--fechar" onClick={closeTerminal}>🙅</button>
        }
      </div>
    )
  }
}

export default Terminal;


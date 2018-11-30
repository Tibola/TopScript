import React from 'react';
import './Terminal.css';

const exec = window.require('child_process').exec;

class Terminal extends React.Component {
  constructor(props) {
    super(props)

    this.theThing = this.theThing.bind(this)
  }
  state = {
    command: 'ls -alh /',
    history: []
  }

  theThing() {
    console.log(this.state)

    exec(this.state.command, (code, stdout, stderr) => {
      this.setState({
        history: [
          ...this.state.history,
          {
            command: this.state.command,
            code: code, 
            stdout: stdout, 
            stderr: stderr
          }
        ],
        command: ''
      })
      var element = document.getElementById("history");
      element.scrollTop = element.scrollHeight;
    });
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.theThing()
    }
  }

  render() {
    const {mostraTerminal, closeTerminal} = this.props

    return (
      <div className={`Terminal ${mostraTerminal && `Amostra`}`}>
        <div className="History" id="history">
          {
            this.state.history.map((line, key) => 
              <div className="row" key={key}>
                <pre>{line.command}</pre>
                <pre>{line.stdout}</pre>
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
        {/* <button className="Terminal--fechar" onClick={closeTerminal}>🙅</button> */}
      </div>
    )
  }
}

export default Terminal;


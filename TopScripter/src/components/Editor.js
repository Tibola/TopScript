import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/javascript/javascript.js';

import './Editor.css';

class Editor extends React.Component {
  componentDidUpdate() {
    const { posicaoCagada } = this.props

    if (posicaoCagada.col !== null && posicaoCagada.lin !== null) {
      let editor = document.querySelector('.CodeMirror-code')

      for (let child of editor.children) {
        child.style.backgroundColor = 'transparent'
      }

      if (editor.children[posicaoCagada.lin - 1]) {
        editor.children[posicaoCagada.lin - 1].style.backgroundColor = 'rgba(255, 99, 71, .3)'
      }
    }
  }

  codemirror = null

  render () {
   const {file, editFile} = this.props 
    
    return (
      <div className="Main">
        <CodeMirror
          value={file && file.data}
          options={{
            tabSize: 2,
            mode: 'python',
            theme: 'material',
            lineNumbers: true,
            extraKeys: {
              "Tab": function(cm) {
                cm.replaceSelection("  ", "end")
              }
            }
          }}
          onBeforeChange={(editor, data, value) => {
            editFile(value)
          }}
          onChange={(editor, data, value) => { }} 
        />
      </div>
    )
  }
};

export default Editor
import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/javascript/javascript.js';

import './Editor.css';

export default ({file, editFile}) => {
  return (
    <div className="Main">
      <CodeMirror
        value={file && file.data}
        options={{
          tabSize: 2,
          mode: 'python',
          theme: 'material',
          lineNumbers: true
        }}
        onBeforeChange={(editor, data, value) => {
          editFile(value)
        }}
        onChange={(editor, data, value) => { }} 
      />
    </div>
  )
};

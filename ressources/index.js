import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

let dark = true

window.settings = {}

window.updateData = function(json) {
  if (typeof window.SetSettings == 'function') {
    window.SetSettings(json)
    console.log('window.SetSettings(json);')
  } else {
    setTimeout(() => window.updateData(json), 500)
    console.log('setTimeout')
  }
}

ReactDOM.render(<App dark settings={window.settings} />, document.getElementById('root'))

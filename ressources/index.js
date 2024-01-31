import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

let dark = true

window.settings = {}

window.updateData = function(base64json) {
  if (typeof window.SetSettings == 'function') {
    window.SetSettings(base64json)
  } else {
    setTimeout(() => window.updateData(base64json), 100)
  }
}

ReactDOM.render(<App dark settings={window.settings}/>, document.getElementById('root'))

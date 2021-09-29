import React from 'react'
import ReactDOM from 'react-dom'
import './app.postcss'

import Routes from './Router'

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
)

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App'
import Zelda from './pages/zelda-botw/Zelda'

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/zelda">
        <Zelda />
      </Route>
    </Switch>
  </Router>
)

export default Routes

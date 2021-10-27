import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App'
import WebsockeRouter from './pages/websocket/Websocket.routes'
import Zelda from './pages/zelda-botw/Zelda'

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/zelda">
        <Zelda />
      </Route>
      <Route path="/websocket">
        <WebsockeRouter />
      </Route>
    </Switch>
  </Router>
)

export default Routes

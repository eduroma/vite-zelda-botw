import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Chat from './components/Chat'
import Room from './components/Room'

const WebsockeRouter: React.FC = () => {
  const { path } = useRouteMatch()

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <Room />
        </Route>
        <Route path={`${path}/chat/:roomId`}>
          <Chat />
        </Route>
      </Switch>
    </div>
  )
}

export default WebsockeRouter

import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.svg'

const App: React.FC = () => {
  return (
    <Link to="/zelda">
      <div
        className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex 
      items-center space-x-4"
      >
        <div className="flex-shrink-0">
          <img className="h-12 w-12" src={logo} alt="Zelda logo" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">Zelda</div>
          <p className="text-gray-500">Tailwind Tutorial</p>
        </div>
      </div>
    </Link>
  )
}

export default App

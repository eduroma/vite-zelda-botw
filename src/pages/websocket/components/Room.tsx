import React, { MutableRefObject, useRef, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

interface IRoom {
  id: number
  name: string
}

const defaultRooms: IRoom[] = [
  {
    id: 1,
    name: 'Sala 1',
  },
  {
    id: 2,
    name: 'Sala 2',
  },
]

const Room: React.FC = () => {
  const [rooms, setRooms] = useState<IRoom[]>(defaultRooms)
  const nameInputRef = useRef() as MutableRefObject<any>
  const history = useHistory()
  const { path } = useRouteMatch()

  const handleClick = (roomId: number): void => {
    history.push(`${path}/chat/${roomId}?name=${nameInputRef.current.value}`)
  }

  return (
    <>
      <h1>Salas</h1>
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            ref={nameInputRef}
            className=" bg-indigo-800 px-4 py-1 mx-8 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:bg-indigo-400 rounded-md shadow-md"
          />
        </label>
      </form>
      <ul>
        {rooms.map((room) => (
          <li>
            <div
              onClick={() => handleClick(room.id)}
              onKeyPress={() => handleClick(room.id)}
              role="link"
              tabIndex={0}
              className="cursor-pointer"
            >
              {room.name}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Room

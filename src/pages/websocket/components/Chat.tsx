import React, {
  useEffect,
  useMemo,
  useRef,
  MutableRefObject,
  useState,
} from 'react'
import { useParams } from 'react-router-dom'
import io, { Socket } from 'socket.io-client'
import useQuery from '../../../hooks/useQuery'

interface Message {
  content: string
  userName: string
}

type ChatParams = {
  roomId: string
}

const Chat: React.FC = () => {
  const messageInputRef = useRef() as MutableRefObject<any>
  const [messages, setMessages] = useState<Message[]>([])
  const { roomId } = useParams<ChatParams>()
  const { name } = useQuery()

  const socket = useMemo<Socket>(() => io('http://localhost:3030/room'), [])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('conectado!')

      socket.emit('join', {
        name,
        roomId,
      })
    })

    socket.on(
      'receive-message',
      (content: { content: string; userName: string }) => {
        console.log(content)
        setMessages((prevState) => [...prevState, content])
      }
    )
  }, [name, roomId, socket])

  const sendMessage = (): void => {
    const message: string = messageInputRef.current.value
    socket.emit('send-message', { content: message })
    setMessages((prevState) => [
      ...prevState,
      { content: message, userName: name },
    ])
  }

  return (
    <div className="xl:container mx-auto px-4 py-4">
      <h1>Chat</h1>
      <ul>
        {messages.map((message, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            {message.userName} - {message.content}
          </li>
        ))}
      </ul>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="message">
          Mensagem:
          <input
            type="text"
            id="message"
            ref={messageInputRef}
            className="bg-gray-200 px-4 py-1 mx-8 text-gray-800 border border-transparent 
                       focus:outline-none focus:ring-2 focus:ring-indigo-800 rounded-md shadow-md"
          />
          <button
            className="bg-gray-700 px-4 py-1 text-gray-300 hover:bg-gray-900 
                        focus:outline-none focus:ring-2 border border-transparent rounded-md focus:ring-opacity-50 shadow-md"
            type="button"
            onClick={sendMessage}
          >
            Enviar
          </button>
        </label>
      </form>
    </div>
  )
}

export default Chat

import React, { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Pusher from 'pusher-js'
import axios from './axios'
function App() {
  const [messages, setMesssages] = useState([])

  useEffect(() => {
    axios.get('/messages/sync').then((response) => {
      setMesssages(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('81dd554cf4226a3d6393', {
      cluster: 'eu'
    })

    var channel = pusher.subscribe('messages')
    channel.bind('inserted', (newMessage) => {
      setMesssages([...messages, newMessage])
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  )
}

export default App

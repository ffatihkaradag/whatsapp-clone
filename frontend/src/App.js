import React, { useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Pusher from 'pusher-js'
function App() {
  useEffect(() => {
    const pusher = new Pusher('81dd554cf4226a3d6393', {
      cluster: 'eu'
    })

    var channel = pusher.subscribe('messages')
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data))
    })
  }, [])
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default App

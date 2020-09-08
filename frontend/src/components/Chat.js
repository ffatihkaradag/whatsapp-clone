import React from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import SearchIcon from '@material-ui/icons/Search'
import MicIcon from '@material-ui/icons/Mic'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import './Chat.css'
function Chat() {
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at.</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        <p className="chat__message">
          <span className="chat__name">John Doe</span>
          this is a message
          <span className="chat_timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat__message chat__receiver">
          <span className="chat__name">John Doe</span>
          this is a message
          <span className="chat_timestamp">{new Date().toUTCString()}</span>
        </p>
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input placeholder="Type a message" type="text" />
          <button type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat

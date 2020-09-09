import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import Messages from './dbMessages.js'
import cors from 'cors'
//app config
const app = express()
const port = process.env.PORT || 9000

//pusher
var pusher = new Pusher({
  appId: '1069662',
  key: '81dd554cf4226a3d6393',
  secret: '304029951c5e16da68fb',
  cluster: 'eu',
  encrypted: true
})

pusher.trigger('my-channel', 'my-event', {
  message: 'hello world'
})

//middlewares
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})
app.use(cors())

//DB config
const connection_url =
  'mongodb+srv://admin:FMWxdmiBUbVOfLPd@cluster0.xut2l.mongodb.net/whatsapp?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db = mongoose.connection

db.once('open', () => {
  console.log('db connected')

  const msgCollection = db.collection('messagecontents')
  const changeStream = msgCollection.watch()

  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received
      })
    } else {
      console.log('error trigger pusher')
    }
  })
})

//api endpoints
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// get all messages
app.get('/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

// create a new message
app.post('/messages/new', (req, res) => {
  const dbMessage = req.body

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

//listen
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

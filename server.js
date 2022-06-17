import express from 'express'
import cors from 'cors'

const server = express()
server.use(express.json());
server.use(cors())
const usuarios = []

server.post('/sign-up', (req, res) => {
  console.log(req.body)
  const user = req.body.username
  const avatar = req.body.avatar
  const dadosUser = {
    username: user,
    avatar
  }
  console.log(dadosUser)
  usuarios.push(dadosUser)
  res.send(usuarios)
})
server.listen(5001)

import express from 'express'
import cors from 'cors'

const server = express()
server.use(express.json())
server.use(cors())
const usuarios = []
const tweets = []

server.post('/sign-up', (req, res) => {
  const dadosUser = req.body
  usuarios.push(dadosUser)
  res.send(usuarios)
})
server.post('/tweets', (req, res) => {
  const tweet = req.body
  const usuarioAtivo = usuarios.find(user => user.username === tweet.username)
  if (usuarioAtivo === undefined) {
    res.send('Não tem ninguem cadastrado com esse nome')
  } else if (usuarioAtivo.username === tweet.username) {
    const dadosTweet = {
      username: tweet.username,
      avatar: usuarioAtivo.avatar,
      tweet: tweet.tweet
    }
    tweets.push(dadosTweet)
    res.send(tweets)
  }
})
server.get('/tweets', (req, res) => {
  if (tweets.length === 0) {
    res.send('')
  } else {
    res.send(tweets)
  }
})
server.listen(5000)

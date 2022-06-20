import express from 'express'
import cors from 'cors'

const server = express()
server.use(express.json())
server.use(cors())
const usuarios = []
const tweets = []

server.post('/sign-up', (req, res) => {
  const dadosUser = req.body
  if (dadosUser.username === '' || dadosUser.avatar === '') {
    return res.status(400).send('Todos os campos são obrigatórios!')
  } else {
    usuarios.push(dadosUser)
    res.send(usuarios)
  }
})
server.post('/tweets', (req, res) => {
  const tweet = req.body
  const usuarioAtivo = usuarios.find(user => user.username === tweet.username)

  if (tweet.username === '' || tweet.tweet === '') {
    return res.status(400).send('Todos os campos são obrigatórios!')
  } else if (usuarioAtivo === undefined) {
    res.status(400).send('Não tem ninguem cadastrado com esse nome')
    return
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
server.get('/tweets/:USERNAME', (req, res) => {
  if (tweets.length === 0) {
    res.send('')
  } else {
    const usuario = req.params.USERNAME
    const filtrarTweetUser = tweets.filter(
      tweetUser => tweetUser.username === usuario
    )
    res.send(filtrarTweetUser)
  }
})
server.listen(5000)

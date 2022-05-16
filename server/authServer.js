import express from 'express'
import cors from 'cors'
import auth from './api/auth.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', auth)
app.use('*', (req, res) => {
  res.status(404)
  res.send({ error: 'Page not found' })
})

export default app
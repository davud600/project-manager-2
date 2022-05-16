import express from 'express'
import cors from 'cors'
import projects from './api/projects.route.js'
import lists from './api/lists.route.js'
import tasks from './api/tasks.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/projects', projects)
app.use('/api/v1/lists', lists)
app.use('/api/v1/tasks', tasks)
app.use('*', (req, res) => {
  res.status(404)
  res.send({ error: 'Page not found' })
})

export default app
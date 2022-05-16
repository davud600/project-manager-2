import app from './server.js'
import authServer from './authServer.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import ProjectsDAO from './dao/projectsDAO.js'
import AuthDAO from './dao/authDAO.js'
import ListsDAO from './dao/listsDAO.js'
import TasksDAO from './dao/tasksDAO.js'

dotenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.PORT
const authPort = process.env.AUTH_PORT

MongoClient.connect(
  process.env.DB_URI,
  {

  }
).catch(err => {
  console.error(err.stack)
}).then(async conn => {
  await AuthDAO.injectDB(conn)
  await ProjectsDAO.injectDB(conn)
  await ListsDAO.injectDB(conn)
  await TasksDAO.injectDB(conn)

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
  })
  
  authServer.listen(authPort, () => {
    console.log(`Auth Server Listening on port: ${authPort}`)
  })
})

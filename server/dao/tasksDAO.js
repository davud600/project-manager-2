import { ObjectId } from 'mongodb'
import ListsDAO from './listsDAO.js'

let tasks

export default class TasksDAO {
  static async injectDB(conn) {
    if (tasks)
      return

    try {
      tasks = await conn.db(process.env.WS_DB).collection(process.env.T_C)
    } catch (e) {
      console.error(`Error: ${e}`)
    }
  }

  static async getTask({ _id }) {
    let task
    
    try {
      task = await tasks
        .find({ _id: ObjectId(_id) })
        .skip(0).limit(0).toArray()
    } catch (e) {
      console.error(`Error ${e}`)
    }

    return task
  }

  static async getTasks({ list_id, authenticated_user_id }) {
    let tasksList

    try {
      if (!await ListsDAO.listBelongsToUser({
        list_id: list_id,
        user_id: authenticated_user_id
      })) return 'error'
      
      tasksList = await tasks
        .find({ list_id: ObjectId(list_id) })
        .skip(0).limit(0).toArray()
    } catch (e) {
      console.error(`Error ${e}`)
    }

    return tasksList
  }

  static async createTask({ list_id, description, authenticated_user_id }) {
    const date = Date()
    const task = {
      date: date,
      list_id: ObjectId(list_id),
      description: description
    }

    try {
      if (!await ListsDAO.listBelongsToUser({
        list_id: list_id,
        user_id: authenticated_user_id
      })) return 'error'

      await tasks.insertOne(task)
    } catch (e) {
      console.error(`Error ${e}`)
    }
  }

  static async updateTask({ _id, description, authenticated_user_id }) {
    const date = Date()

    try {
      if (!await TasksDAO.taskBelongsToUser({
        task_id: _id,
        user_id: authenticated_user_id
      })) return 'error'

      await tasks.updateOne({
        _id: ObjectId(_id)
      }, {
        $set: {
          description: description,
          date: date
        }
      })
    } catch (e) {
      console.error(`Error ${e}`)
    }
  }

  static async deleteTask({ _id, authenticated_user_id }) {
    try {
      if (!await TasksDAO.taskBelongsToUser({
        task_id: _id,
        user_id: authenticated_user_id
      })) return 'error'

      await tasks.deleteOne({ _id: ObjectId(_id) })
    } catch (e) {
      console.error(`Error ${e}`)
    }
  }

  static async taskBelongsToUser({ task_id, user_id }) {
    try {
      const taskList = await TasksDAO.getTask({ _id: task_id })
      const list_id = taskList[0].list_id.toString()

      if (!await ListsDAO.listBelongsToUser({
        list_id: list_id,
        user_id: user_id
      })) return false
    } catch (e) {
      console.error(`Error ${e}`)
    }

    return true
  }
}
import TasksDAO from '../dao/tasksDAO.js'

export default class TasksController {
  static async apiGetTasksOfList(req, res) {
    const { list_id } = req.query
    const { user } = req

    try {
      const tasksList = await TasksDAO.getTasks({
        list_id: list_id,
        authenticated_user_id: user._id
      })

      if (tasksList == 'error') {
        console.error('error not the correct user')
        return res.sendStatus(400)
      }

      res.json({ tasks: tasksList })
    } catch (e) {
      res.sendStatus(500)
      console.error(`Error ${e}`)
    }
  }

  static async apiCreateTask(req, res) {
    const { list_id, description } = req.body
    const { user } = req

    try {
      const createTaskResult = await TasksDAO.createTask({
        list_id: list_id,
        description: description,
        authenticated_user_id: user._id
      })

      if (createTaskResult == 'error') {
        console.error('error not the correct user')
        return res.sendStatus(400)
      }

      res.sendStatus(200)
    } catch (e) {
      res.sendStatus(500)
      console.error(`Error ${e}`)
    }
  }

  static async apiUpdateTask(req, res) {
    const { task_id } = req.query
    const { description } = req.body
    const { user } = req

    try {
      const updateTaskResult = await TasksDAO.updateTask({
        _id: task_id,
        description: description,
        authenticated_user_id: user._id
      })

      if (updateTaskResult == 'error') {
        console.error('error not the correct user')
        return res.sendStatus(400)
      }

      res.sendStatus(200)
    } catch (e) {
      res.status(500)
      console.error(`Error ${e}`)
    }
  }

  static async apiDeleteTask(req, res) {
    const { task_id } = req.query
    const { user } = req

    try {
      const deleteTaskResult = await TasksDAO.deleteTask({
        _id: task_id,
        authenticated_user_id: user._id
      })

      if (deleteTaskResult == 'error') {
        console.error('error not the correct user')
        return res.sendStatus(400)
      }
      
      res.sendStatus(200)
    } catch (e) {
      res.status(500)
      console.error(`Error ${e}`)
    }
  }
}
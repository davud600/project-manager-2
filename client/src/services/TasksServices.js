import { httpTasks } from '../http-common'

class TasksServices {
  getTasks(list_id) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }

    return httpTasks.get(`?list_id=${list_id}`,
    {
      headers: headers
    })
  }

  createTask(doc) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }
    
    return httpTasks.post('/create-task',
      doc,
      {
        headers: headers
      }
    )
  }

  updateTask(task_id, doc) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }
    
    return httpTasks.put(`/update-task?task_id=${task_id}`,
      doc,
      {
        headers: headers
      }
    )
  }

  deleteTask(task_id) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }
    
    return httpTasks.delete(`/delete-task?task_id=${task_id}`,
    {
      headers: headers
    })
  }
}

export default new TasksServices()
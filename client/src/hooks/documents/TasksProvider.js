import { useState,
  useContext,
  createContext
} from "react"
import { useAuth } from "../Auth"
import TasksServices from "../../services/TasksServices"

const TasksContext = createContext()

export function useTasks() {
  return useContext(TasksContext)
}

export default function TasksProvider({ children }) {
  const { authorizeUser } = useAuth()

  const [ listTasks, setListTasks ] = useState([])

  const fetchTasks = async (list_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await authorizeUser()
        const res = await TasksServices.getTasks(list_id)
        const tasks = await res.data.tasks
        
        setListTasks(tasks)
        resolve("Successfully fetched tasks!")
      } catch (e) {
        reject(e.response.data)
      }
    })
  }
  const createTask = async (userInput) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (userInput.title === "")
          return reject("Invalid inputs!")

        await TasksServices.createTask(userInput)
        resolve("Added new task!")
      } catch (e) {
        reject("Could not add new task!")
      }
    })
  }
  const updateTask = async (userInput, task_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (userInput.title === "")
          return reject("Invalid inputs!")

        await TasksServices.updateTask(task_id, userInput)
        resolve("Edited task info!")
      } catch (e) {
        reject("Could not edit task info!")
      }
    })
  }
  const deleteTask = async (task_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await TasksServices.deleteTask(task_id)
        resolve("Deleted task!")
      } catch (e) {
        reject("Could not delete task!")
      }
    })
  }
  
  const value = {
    listTasks,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  }
  
  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  )
}
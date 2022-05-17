import { useState,
  useContext,
  createContext
} from "react"
import { useAuth } from "../Auth"
import ListsServices from "../../services/ListsServices"

const ListsContext = createContext()

export function useLists() {
  return useContext(ListsContext)
}

export default function ListsProvider({ children }) {
  const { authorizeUser } = useAuth()

  const [ projectLists, setProjectLists ] = useState([])

  const fetchLists = async (project_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await authorizeUser()
        const res = await ListsServices.getLists(project_id)
        const lists = await res.data.lists
        
        setProjectLists(lists)
        resolve("Successfully fetched lists!")
      } catch (e) {
        reject(e.response.data)
      }
    })
  }
  const createList = async (userInput) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (userInput.title === "")
          return reject("Invalid inputs!")

        await ListsServices.createList(userInput)
        resolve("Added new llist!")
      } catch (e) {
        reject("Could not add new list!")
      }
    })
  }
  const updateList = async (userInput, list_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (userInput.title === "")
          return reject("Invalid inputs!")

        await ListsServices.updateList(list_id, userInput)
        resolve("Edited list info!")
      } catch (e) {
        reject("Could not edit list info!")
      }
    })
  }
  const deleteList = async (list_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await ListsServices.deleteList(list_id)
        resolve("Deleted list!")
      } catch (e) {
        reject("Could not delete list!")
      }
    })
  }
  
  const value = {
    projectLists,
    fetchLists,
    createList,
    updateList,
    deleteList
  }
  
  return (
    <ListsContext.Provider value={value}>
      {children}
    </ListsContext.Provider>
  )
}
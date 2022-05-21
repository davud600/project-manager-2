import { useState,
  useContext,
  createContext
} from "react"
import { useAuth } from "../Auth"
import ListsServices from "../../services/ListsServices"
import TasksServices from "../../services/TasksServices"

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

        await authorizeUser()
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

        await authorizeUser()
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
        await authorizeUser()

        // Delete children
        await deleteChildrenOfObject({
          object_id: list_id,
          has_grand_children: false,
          getChildren: TasksServices.getTasks,
          deleteChild: TasksServices.deleteTask
        })

        // Delete the list
        await ListsServices.deleteList(list_id)
        resolve("Deleted list!")
      } catch (e) {
        reject("Could not delete list!")
      }
    })
  }

  async function deleteChildrenOfObject(props) {
    const {
      object_id,
      has_grand_children,
      getChildren,
      deleteChild
    } = props

    return new Promise(async resolve => {
      // get all children of object
      const res = await getChildren(object_id)
      const children_of_object = await res.data.lists || await res.data.tasks

      // delete all those children
      if (has_grand_children) {
        // if has grand children delete them first
        await Promise.all(
          children_of_object.map(async child => {
            await deleteChildrenOfObject({
              object_id: child._id,
              has_grand_children: false,
              getChildren: TasksServices.getTasks,
              deleteChild: TasksServices.deleteTask
            })
          })
        )
      }
      await Promise.all(
        children_of_object.map(async child => {
          await deleteChild(child._id)
        })
      )

      resolve()
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
import { useState,
  useContext,
  createContext
} from "react"
import { useAuth } from "../Auth"
import ProjectsServices from "../../services/ProjectsServices"
import ListsServices from "../../services/ListsServices"
import TasksServices from "../../services/TasksServices"

const ProjectsContext = createContext()

export function useProjects() {
  return useContext(ProjectsContext)
}

export default function ProjectsProvider({ children }) {
  const { authorizeUser } = useAuth()

  // Projects
  const [ userProjects, setUserProjects ] = useState([])
  const [ currentProject, setCurrentProject ] = useState({})
  
  // Projects Page
  const fetchProjects = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await authorizeUser()
        const res = await ProjectsServices.getProjects()
        const projects = await res.data.projects
        
        setUserProjects(projects)
        resolve("Successfully fetched projects!")
      } catch (e) {
        reject(e.response.data)
      }
    })
  }
  const createProject = async (userInput) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (userInput.title === "")
          return reject("Invalid inputs!")

        await ProjectsServices.createProject(userInput)
        resolve("Added new project!")
      } catch (e) {
        reject("Could not add new project!")
      }
    })
  }

  // Project Page
  const fetchProject = async (project_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await authorizeUser()
        const res = await ProjectsServices.getProject(project_id)
        const project = await res.data.projects[0]
        
        setCurrentProject(project)
        resolve("Successfully fetched project!")
      } catch (e) {
        reject(e.response.data)
      }
    })
  }
  const updateProject = async (userInput) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (userInput.title === "")
          return reject("Invalid inputs!")

        await ProjectsServices.updateProject(currentProject._id, userInput)
        resolve("Edited project info!")
      } catch (e) {
        reject("Could not edit project info!")
      }
    })
  }
  const deleteProject = async (project_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Delete children and grandchildren
        await deleteChildrenOfObject({
          object_id: project_id,
          has_grand_children: true,
          getChildren: ListsServices.getLists,
          deleteChild: ListsServices.deleteList
        })

        // Delete the project
        await ProjectsServices.deleteProject(project_id)
        resolve("Deleted project!")
      } catch (e) {
        reject("Could not delete project!")
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
    userProjects,
    fetchProjects,
    createProject,
    currentProject,
    fetchProject,
    updateProject,
    deleteProject,
  }
  
  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  )
}
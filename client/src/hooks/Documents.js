import { useState,
  useEffect,
  useContext,
  createContext
} from "react"
import { useAuth } from "./Auth"
import ProjectsServices from "../services/ProjectsSerivces"

const DocumentsContext = createContext()

export function useDocuments() {
  return useContext(DocumentsContext)
}

export default function DocumentsProvider({ children }) {
  const { authorizeUser } = useAuth()
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
        await ProjectsServices.deleteProject(project_id)
        resolve("Edited project info!")
      } catch (e) {
        reject("Could not edit project info!")
      }
    })
  }
  
  const value = {
    userProjects,
    fetchProjects,
    createProject,

    currentProject,
    fetchProject,
    updateProject,
    deleteProject
  }
  
  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  )
}
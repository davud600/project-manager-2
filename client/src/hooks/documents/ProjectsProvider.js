import { useState,
  useContext,
  createContext
} from "react"
import { useAuth } from "../Auth"
import ProjectsServices from "../../services/ProjectsServices"

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
        await ProjectsServices.deleteProject(project_id)
        resolve("Deleted project!")
      } catch (e) {
        reject("Could not delete project!")
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
    deleteProject,
  }
  
  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  )
}
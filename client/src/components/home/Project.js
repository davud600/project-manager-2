import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useWindowDimensions } from "../../hooks/WindowDimensions"
import { useProjects } from "../../hooks/documents/ProjectsProvider"
import ListsProvider from "../../hooks/documents/ListsProvider"
import Header from "../Header"
import ProjectLists from "./lists/ProjectLists"
import Title from "../Title"

let isPhone, pageTitleFontSize, cardFontSize,
gap, cardWidth, taskFontSize, titlePadding,
deleteButtonFontSize

const BACKGROUND_COLOR = "#f5f5f7"

export default function Project() {
  const {
    currentProject,
    fetchProject,
    updateProject,
    deleteProject
  } = useProjects()
  
  const { width, height } = useWindowDimensions()
  const [ searchParams ] = useSearchParams()
  const navigate = useNavigate()

  isPhone = height / width >= 16 / 16
  pageTitleFontSize = isPhone ? "1.5rem":"2rem"
  cardFontSize = isPhone ? "1rem":"1.25rem"
  cardWidth = isPhone ? "15rem":"19.25rem"
  gap = isPhone ? "3px":"10px"
  taskFontSize = isPhone ? ".9rem":"1rem"
  titlePadding = isPhone ? "0 3rem":"0 6rem"
  deleteButtonFontSize = isPhone ? "0.8rem":"1rem"

  const [ message, setMessage ] = useState("")
  const [ isEditingTitle, setIsEditingTitle ] = useState(false)
  const [ newTitle, setNewTitle ] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      await fetchProject(searchParams.get("project_id"))
    }
    
    fetchData()
  }, [])

  const editTitle = async (e) => {
    if (e.key !== "Enter")
      return
    
    setIsEditingTitle(false)
    // Edit title
    try {
      setMessage(await updateProject({
        title: newTitle
      }))

      await fetchProject(searchParams.get("project_id"))
    } catch (e) {
      setMessage(e)
    }
  }

  const removeProject = async () => {
    // Delete document
    try {
      setMessage(await deleteProject(searchParams.get("project_id")))

      navigate("/dashboard")
    } catch (e) {
      setMessage(e)
    }
  }

  const projectListsProps = {
    gap: gap,
    cardFontSize: cardFontSize,
    cardWidth: cardWidth,
    taskFontSize: taskFontSize
  }
  const titleProps = {
    isEditingTitle: isEditingTitle,
    setIsEditingTitle: setIsEditingTitle,
    titleClassName: "mt-4 mb-2 text-center editable-title d-flex justify-content-between",
    titleStyle: {
      fontSize: pageTitleFontSize,
      cursor: "pointer",
      backgroundColor: BACKGROUND_COLOR,
      minWidth: "fit-content",
      padding: titlePadding
    },
    title: currentProject.title,
    newTitle: newTitle,
    setNewTitle: setNewTitle,
    editTitle: editTitle,
    inputClassName: "mb-2 mt-4 p-0 text-center add-item-text-area",
    inputStyle: {
      fontSize: pageTitleFontSize,
      backgroundColor: BACKGROUND_COLOR,
      opacity: "0.5",
      minWidth: "fit-content"
    },
    centered: true
  }

  return (
    <div style={{
      backgroundColor: BACKGROUND_COLOR,
      height: height
    }}>
      <Header />
      <div className="d-flex flex-column">
        <div className="d-flex flex-row justify-content-center">
          {currentProject ?
          <div className="d-flex flex-row">
            <Title props={titleProps}></Title>
            <a className="btn btn-link p-0"
              style={{
                marginTop: "2.25rem",
                color: "red",
                fontSize: deleteButtonFontSize
              }}
              onClick={removeProject}
            >Delete</a>
          </div>
          :<></>}
        </div>
        
        <ListsProvider>
          <ProjectLists props={projectListsProps} />
        </ListsProvider>
      </div>
    </div>
  )
}

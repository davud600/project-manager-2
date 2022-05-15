import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useWindowDimensions } from "../../hooks/WindowDimensions"
import Header from "../Header"
import ProjectLists from "./lists/ProjectLists"
import Title from "../Title"

let isPhone, pageTitleFontSize, cardFontSize,
gap, cardTextMarginLeft, cardWidth,
taskFontSize

const BACKGROUND_COLOR = "#f5f5f7"

export default function Project() {
  const { width, height } = useWindowDimensions()
  const [ searchParams ] = useSearchParams()

  isPhone = height / width >= 16 / 16
  pageTitleFontSize = isPhone ? "1.5rem":"2rem"
  cardFontSize = isPhone ? "1rem":"1.25rem"
  cardWidth = isPhone ? "15rem":"19.25rem"
  gap = isPhone ? "3px":"10px"
  cardTextMarginLeft = isPhone ? "5px":"10px"
  taskFontSize = isPhone ? ".9rem":"1rem"

  const [ project, setProject ] = useState({
    _id: searchParams.get("project_id"),
    title: "project title"
  })
  
  const [ isEditingTitle, setIsEditingTitle ] = useState(false)
  const [ newTitle, setNewTitle ] = useState("project title")

  const editTitle = (e) => {
    if (e.key !== "Enter")
      return
    
    setIsEditingTitle(false)
    // Edit title
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
    titleClassName: "mt-4 mb-2 text-center editable-title",
    titleStyle: {
      fontSize: pageTitleFontSize,
      cursor: "pointer",
      backgroundColor: BACKGROUND_COLOR,
      minWidth: "fit-content",
      padding: "0 6.25rem"
    },
    title: project.title,
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
          <div style={{
            marginLeft: "5rem"
          }}>
            <Title props={titleProps}></Title>
          </div>
          <div style={{
            marginTop: "2rem"
          }}>
            <button className="btn btn-danger"
              style={{
                paddingLeft: "1rem",
                paddingRight: "1rem"
              }}
            >Delete</button>
          </div>
        </div>
        <ProjectLists props={projectListsProps} />
      </div>
    </div>
  )
}

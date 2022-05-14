import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useWindowDimensions } from "../../hooks/WindowDimensions"
import Header from "../Header"
import ProjectLists from "./lists/ProjectLists"
import Title from "../Title"

let isPhone, pageTitleFontSize, cardFontSize,
gap, cardTextMarginLeft, cardWidth,
taskFontSize

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
      cursor: "pointer"
    },
    title: project.title,
    newTitle: newTitle,
    setNewTitle: setNewTitle,
    editTitle: editTitle,
    inputClassName: "mb-2 mt-4 p-0 text-center add-item-text-area",
    inputStyle: {
      fontSize: pageTitleFontSize,
      backgroundColor: "white",
      opacity: "0.5"
    },
    centered: true
  }

  return (
    <div style={{
      backgroundColor: "#f5f5f7",
      height: height
    }}>
      <Header />
      <div className="d-flex flex-column">
        <Title props={titleProps} />
        <ProjectLists props={projectListsProps} />
      </div>
    </div>
  )
}

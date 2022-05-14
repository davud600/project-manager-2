import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useWindowDimensions } from "../../../hooks/WindowDimensions"
import Header from "../../Header"
import ProjectLists from "../lists/ProjectLists"

let isPhone, pageTitleFontSize, cardFontSize,
gap, cardTextMarginLeft, cardWidth,
taskFontSize

export default function Project() {
  const { width, height } = useWindowDimensions()
  const [ searchParams ] = useSearchParams()

  const [ project, setProject ] = useState({
    _id: searchParams.get("project_id"),
    title: "project title"
  })

  isPhone = height / width >= 16 / 16
  pageTitleFontSize = isPhone ? "1.5rem":"2rem"
  cardFontSize = isPhone ? "1rem":"1.25rem"
  cardWidth = isPhone ? "15rem":"19.25rem"
  gap = isPhone ? "3px":"10px"
  cardTextMarginLeft = isPhone ? "5px":"10px"
  taskFontSize = isPhone ? ".9rem":"1rem"

  const projectListsProps = {
    gap: gap,
    cardFontSize: cardFontSize,
    cardWidth: cardWidth,
    taskFontSize: taskFontSize
  }

  return (
    <div style={{
      backgroundColor: "#f5f5f7",
      height: height
    }}>
      <Header />
      <div className="d-flex flex-column">
        <p className="mt-4 text-center display-6" style={{
          fontSize: pageTitleFontSize
        }}>
          {project.title}
        </p>
        <ProjectLists props={projectListsProps} />
      </div>
    </div>
  )
}

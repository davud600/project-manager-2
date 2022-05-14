import { useState, useRef } from "react"

export default function CreateProjectCard({ props }) {
  const {
    fontSize,
    backgroundColor,
    color,
    cardTextMarginLeft
  } = props

  const [ isCreatingProject, setIsCreatingProject ]= useState(false)
  const title = useRef()
  
  const addProject = () => {
    setIsCreatingProject(false)
    // Add project
  }

  return !isCreatingProject ? (
    <div className="project-card"
      style={{
        opacity: "0.6",
        backgroundColor: backgroundColor
      }}
      onClick={() => {
        setIsCreatingProject(true)
      }}
    >
      <p className="text-start" style={{
        fontSize: fontSize,
        width: "fit-content",
        margin: `0px ${cardTextMarginLeft} 5px ${cardTextMarginLeft}`,

        color: color
      }}
      >+ Add project</p>
    </div>
  ):
  (
    <div className="project-card" style={{
      opacity: "0.6",
      backgroundColor: backgroundColor
    }}>
      <textarea className="add-item-text-area" ref={title}
        style={{
          margin: cardTextMarginLeft,
        }}
        placeholder="Project title"
      />
      <button className="btn btn-success"
        style={{
          color: "white"
        }}
        onClick={addProject}
      >Add project</button>
    </div>
  )
}

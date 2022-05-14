import React, { useState, useRef } from "react"
import ProjectCard from "./ProjectCard"
import CreateDocument from "../../CreateDocument"

const projects = [
  {
    _id: "123456789",
    title: "project kill john lennon"
  },
  {
    _id: "123456788",
    title: "kill the queesdfsdfn"
  },
  {
    _id: "123456787",
    title: "kill the queens"
  }
]

const cardColor = "#5c5c5d"

export default function UserProjects({ props }) {
  const {
    fontSize,
    gap,
    cardTextMarginLeft,
    numOfColumns
  } = props

  const [ isCreatingProject, setIsCreatingProject ] = useState(false)
  const title = useRef()

  const addProject = (e = null) => {
    if (e !== null && e.key !== "Enter")
      return
    
    setIsCreatingProject(false)
    // Add project
  }

  const projectCardProps = {
    fontSize: fontSize,
    backgroundColor: cardColor,
    color: "white",
    cardTextMarginLeft
  }
  const createCardProps = {
    addDocument: addProject,
    isCreatingDocument: isCreatingProject,
    setIsCreatingDocument: setIsCreatingProject,
    title: title,
    cardClassName: "project-card editable-title",
    cardStyle: {
      opacity: "0.6",
      backgroundColor: projectCardProps.backgroundColor
    },
    textClassName: "text-start",
    textStyle: {
      fontSize: fontSize,
      width: "fit-content",
      margin: `0px ${cardTextMarginLeft} 5px ${cardTextMarginLeft}`,

      color: projectCardProps.color
    },
    cardEditingClassName: "project-card",
    cardEditingStyle: {
      opacity: "0.6",
      backgroundColor: projectCardProps.backgroundColor
    },
    inputStyle: {
      fontSize: fontSize,
      margin: cardTextMarginLeft
    },
    documentType: "project"
  }

  return (
    <div className="mt-5 d-grid" style={{
      gap: gap,
      gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`
    }}>
      {projects.map((project, index) => {
        return index !== projects.length - 1 ? (
          <ProjectCard key={project._id}
            props={{...projectCardProps, project: project}}
          />
        ):
        (
          <React.Fragment key={project._id} >
            <ProjectCard props={{...projectCardProps, project: project}} />
            <CreateDocument props={createCardProps} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

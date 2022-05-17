import React, { useEffect, useState, useRef } from "react"
import { useProjects } from "../../../hooks/documents/ProjectsProvider"
import ProjectCard from "./ProjectCard"
import CreateDocument from "../../CreateDocument"

const cardColor = "#5c5c5d"

export default function UserProjects({ props }) {
  const {
    fontSize,
    gap,
    cardTextMarginLeft,
    numOfColumns
  } = props

  const {
    userProjects,
    fetchProjects,
    createProject
  } = useProjects()

  const [ message, setMessage ] = useState("")
  const [ isCreatingProject, setIsCreatingProject ] = useState(false)
  const title = useRef()

  useEffect(() => {
    const fetchData = async () => {
      await fetchProjects()
    }

    fetchData()
  }, [])

  const addProject = async (e = null) => {
    if (e !== null && e.key !== "Enter")
      return
    
    setIsCreatingProject(false)
    // Create project
    try {
      setMessage(await createProject({
        title: title.current.value
      }))

      await fetchProjects()
    } catch (e) {
      setMessage(e)
    }
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
      {userProjects.map((project, index) => {
        return index !== userProjects.length - 1 ? (
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
      {userProjects.length === 0 ?
      <CreateDocument props={createCardProps} />
      :<></>}
    </div>
  )
}

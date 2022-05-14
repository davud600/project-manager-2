import React from "react"
import ProjectCard from "./ProjectCard"
import CreateProjectCard from "./CreateProjectCard"

export default function UserProjects({ props }) {
  const {
    fontSize,
    gap,
    cardTextMarginLeft,
    numOfColumns
  } = props

  const projects = [
    {
      _id: "123456789",
      title: "project kill john lennon"
    },
    {
      _id: "123456788",
      title: "kill the queen"
    },
    {
      _id: "123456787",
      title: "kill the queen"
    }
  ]

  const cardColor = "#5c5c5d"

  return (
    <div className="mt-5 d-grid" style={{
      gap: gap,
      gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`
    }}>
      {projects.map((project, index) => {
        return index !== projects.length - 1 ? (
          <ProjectCard key={project._id} props={{
            project: project,
            fontSize: fontSize,
            backgroundColor: cardColor,
            color: "white",
            cardTextMarginLeft
          }} />
        ):
        (
          <React.Fragment key={project._id} >
            <ProjectCard props={{
              project: project,
              fontSize: fontSize,
              backgroundColor: cardColor,
              color: "white",
              cardTextMarginLeft
            }} />
            <CreateProjectCard props={{
              fontSize: fontSize,
              backgroundColor: cardColor,
              color: "white",
              cardTextMarginLeft
            }} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

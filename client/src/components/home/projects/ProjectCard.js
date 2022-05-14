import { useNavigate } from "react-router-dom"

export default function ProjectCard({ props }) {
  const {
    project,
    fontSize,
    backgroundColor,
    color,
    cardTextMarginLeft
  } = props

  const navigate = useNavigate()
  
  return (
    <div className="project-card"
      style={{
        backgroundColor: backgroundColor
      }}
      onClick={() => {
        navigate(`/project?project_id=${project._id}`)
      }}
    >
      <p className="fw-bold text-start" style={{
        fontSize: fontSize,
        width: "fit-content",
        margin: `0px ${cardTextMarginLeft} 5px ${cardTextMarginLeft}`,

        color: color
      }}
      >{project.title}</p>
    </div>
  )
}

import { useRef } from "react"
import { useOutsideAlerter } from "../hooks/OutsideAlerter"

export default function Title({ props }) {
  const {
    isEditingTitle,
    setIsEditingTitle,
    titleClassName,
    titleStyle,
    title,
    newTitle,
    setNewTitle,
    editTitle,
    inputClassName,
    inputStyle,
    centered = false,
    deleteDocument
  } = props

  const titleRef = useRef()
  useOutsideAlerter(titleRef, setIsEditingTitle, false)

  return (
    <div className={centered ? "text-center":""}>
      {!isEditingTitle ?
      <p className={titleClassName}
        style={titleStyle}
        onClick={() => setIsEditingTitle(true)}
      >
        {title}
        <button className="btn p-0"
          style={{
            marginTop: ".275rem",
            width: "1rem",
            height: "1rem",
            backgroundColor: "#bfafae",
            opacity: "0.5"
          }}
          onClick={deleteDocument}
        ></button>
      </p>:
      <input className={inputClassName}
        style={inputStyle}
        onKeyUp={(e) => editTitle(e)}
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value)
        }}
        autoFocus={true}
        ref={titleRef}
      />}
    </div>
  )
}

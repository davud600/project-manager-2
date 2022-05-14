import { useState } from "react"
import Title from "../../Title"

export default function TaskCard({ props }) {
  const {
    taskFontSize
  } = props
  const CARD_COLOR = "white"

  const [ isEditingTitle, setIsEditingTitle ] = useState(false)
  const [ newTitle, setNewTitle ] = useState("TaskCard")

  const editTitle = (e) => {
    if (e.key !== "Enter")
      return
    
    setIsEditingTitle(false)
    // Edit title
  }

  const titleProps = {
    isEditingTitle: isEditingTitle,
    setIsEditingTitle: setIsEditingTitle,
    titleClassName: "m-2 editable-title",
    titleStyle: {
      fontSize: taskFontSize
    },
    title: "TaskCard",
    newTitle: newTitle,
    setNewTitle: setNewTitle,
    editTitle: editTitle,
    inputClassName: "m-2 mb-0 p-0 ps-1 pe-1 pb-2 add-item-text-area",
    inputStyle: {
      fontSize: taskFontSize,
      backgroundColor: "white",
      opacity: "0.5"
    }
  }

  return (
    <div className="task-card"
      style={{
        backgroundColor: CARD_COLOR,
        wordWrap: "break-word"
      }}
    >
      <Title props={titleProps} />
    </div>
  )
}

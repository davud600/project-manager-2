import { useState } from "react"
import ListTasks from "../tasks/ListTasks"
import Title from "../../Title"

export default function ListCard({ props }) {
  const {
    cardFontSize,
    cardWidth,
    taskFontSize
  } = props
  const CARD_COLOR = "grey"

  const [ isEditingTitle, setIsEditingTitle ] = useState(false)
  const [ newTitle, setNewTitle ] = useState("ListCard")

  const editTitle = (e) => {
    if (e.key !== "Enter")
      return
    
    setIsEditingTitle(false)
    // Edit title
  }

  const deleteList = () => {
  }

  const listTasksProps = {
    taskFontSize: taskFontSize
  }
  const titleProps = {
    isEditingTitle: isEditingTitle,
    setIsEditingTitle: setIsEditingTitle,
    titleClassName: "m-2 fw-bold editable-title d-flex justify-content-between",
    titleStyle: {
      fontSize: cardFontSize,
      cursor: "pointer"
    },
    title: "ListCard",
    newTitle: newTitle,
    setNewTitle: setNewTitle,
    editTitle: editTitle,
    inputClassName: "m-2 mt-0 mb-3 p-0 ps-1 pe-1 fw-bold add-item-text-area",
    inputStyle: {
      fontSize: cardFontSize,
      backgroundColor: "white",
      opacity: "0.25",
    },
    deleteDocument: deleteList
  }

  return (
    <div className="list-card"
      style={{
        minWidth: cardWidth,
        width: cardWidth,
        backgroundColor: CARD_COLOR,
        padding: ".5rem"
      }}
    >
      <div style={{
        position: "sticky",
        top: "1rem"
      }}>
        <Title props={titleProps} />
      </div>
      <ListTasks props={listTasksProps} />
    </div>
  )
}

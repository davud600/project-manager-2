import { useState } from "react"
import { useLists } from "../../../hooks/documents/ListsProvider"
import TasksProvider from "../../../hooks/documents/TasksProvider"
import ListTasks from "../tasks/ListTasks"
import Title from "../../Title"

export default function ListCard({ props, list }) {
  const {
    cardFontSize,
    cardWidth,
    taskFontSize,
    refreshLists
  } = props
  const CARD_COLOR = "grey"

  const {
    updateList,
    deleteList
  } = useLists()

  const [ message, setMessage ] = useState("")
  const [ isEditingTitle, setIsEditingTitle ] = useState(false)
  const [ newTitle, setNewTitle ] = useState("")

  const editTitle = async (e) => {
    if (e.key !== "Enter")
      return
    
    setIsEditingTitle(false)
    // Edit title
    try {
      setMessage(await updateList({
        title: newTitle
      }, list._id))

      await refreshLists()
    } catch (e) {
      setMessage(e)
    }
  }

  const removeList = async () => {
    // Delete document
    try {
      setMessage(await deleteList(list._id))

      await refreshLists()
    } catch (e) {
      setMessage(e)
    }
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
    title: list.title,
    newTitle: newTitle,
    setNewTitle: setNewTitle,
    editTitle: editTitle,
    inputClassName: "m-2 mt-0 mb-3 p-0 ps-1 pe-1 fw-bold add-item-text-area",
    inputStyle: {
      fontSize: cardFontSize,
      backgroundColor: "white",
      opacity: "0.25",
    },
    deleteDocument: removeList
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
      
      <TasksProvider>
        <ListTasks props={listTasksProps}
          list_id={list._id}
        />
      </TasksProvider>
    </div>
  )
}

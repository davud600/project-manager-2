import { useState } from "react"
import { useTasks } from "../../../hooks/documents/TasksProvider"
import Title from "../../Title"

export default function TaskCard({ props, task }) {
  const {
    taskFontSize,
    refreshTasks
  } = props
  const CARD_COLOR = "white"

  const {
    updateTask,
    deleteTask
  } = useTasks()

  const [ message, setMessage ] = useState("")
  const [ isEditingTitle, setIsEditingTitle ] = useState(false)
  const [ newTitle, setNewTitle ] = useState("")

  const editTitle = async (e) => {
    if (e.key !== "Enter")
      return
    
    setIsEditingTitle(false)
    // Edit title
    try {
      setMessage(await updateTask({
        description: newTitle
      }, task._id))

      await refreshTasks()
    } catch (e) {
      setMessage(e)
    }
  }

  const removeTask = async () => {
    // Delete document
    try {
      setMessage(await deleteTask(task._id))

      await refreshTasks()
    } catch (e) {
      setMessage(e)
    }
  }

  const titleProps = {
    isEditingTitle: isEditingTitle,
    setIsEditingTitle: setIsEditingTitle,
    titleClassName: "m-2 editable-title d-flex justify-content-between",
    titleStyle: {
      fontSize: taskFontSize
    },
    title: task.description,
    newTitle: newTitle,
    setNewTitle: setNewTitle,
    editTitle: editTitle,
    inputClassName: "m-2 mb-0 p-0 ps-1 pe-1 pb-2 add-item-text-area",
    inputStyle: {
      fontSize: taskFontSize,
      backgroundColor: "white",
      opacity: "0.5"
    },
    deleteDocument: removeTask
  }

  return (
    <div className="task-card me-1"
      style={{
        backgroundColor: CARD_COLOR,
        wordWrap: "break-word"
      }}
    >
      <Title props={titleProps} />
    </div>
  )
}

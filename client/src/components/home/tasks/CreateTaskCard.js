import { useState, useRef } from "react"

const CARD_COLOR = "black"

export default function CreateTaskCard({ props }) {
  const {
    taskFontSize
  } = props

  const [ isCreatingTask, setIsCreatingTask ]= useState(false)
  const title = useRef()

  const addTask = () => {
    setIsCreatingTask(false)
    // Add task
  }

  return !isCreatingTask ? (
    <div className="task-card"
      style={{
        backgroundColor: CARD_COLOR,
        opacity: "0.6"
      }}
      onClick={() => {
        setIsCreatingTask(true)
      }}
    >
      <p className="m-2 fw-bold" style={{
        fontSize: taskFontSize,
        color: "white"
      }}>
        + Add task
      </p>
    </div>
  ):
  (
    <div className="task-card d-flex align-items-center flex-column"
      style={{
        backgroundColor: CARD_COLOR,
        opacity: "0.6",
      }}
    >
      <textarea className="add-item-text-area" ref={title}
        style={{
          margin: "1rem",
        }}
        placeholder="Task title"
      />
      <button className="btn btn-success mb-3"
        style={{
          color: "white"
        }}
        onClick={addTask}
      >Add task</button>
    </div>
  )
}

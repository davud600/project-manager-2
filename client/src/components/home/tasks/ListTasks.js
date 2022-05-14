import React, { useState, useRef } from "react"
import TaskCard from "./TaskCard"
import CreateDocument from "../../CreateDocument"

const tasks = [
  {
    _id: "000123456789",
    title: "project kill john lennon task 1",
    list_id: "00123456789"
  },
  {
    _id: "000123456788",
    title: "project kill john lennon task 2",
    list_id: "00123456788"
  }
]

const CARD_COLOR = "black"

export default function ListTasks({ props }) {
  const {
    taskFontSize
  } = props

  const [ isCreatingTask, setIsCreatingTask ]= useState(false)
  const title = useRef()

  const addTask = (e = null) => {
    if (e !== null && e.key !== "Enter")
      return

    setIsCreatingTask(false)
    // Add task
  }
  
  const taskCardProps = {
    taskFontSize: taskFontSize
  }
  const createCardProps = {
    addDocument: addTask,
    isCreatingDocument: isCreatingTask,
    setIsCreatingDocument: setIsCreatingTask,
    title: title,

    cardClassName: "task-card editable-title",
    cardStyle: {
      backgroundColor: CARD_COLOR,
      opacity: "0.6"
    },
    textClassName: "m-2",
    textStyle: {
      fontSize: taskFontSize,
      color: "white"
    },
    cardEditingClassName: "pb-3 task-card d-flex align-items-center flex-column",
    cardEditingStyle: {
      backgroundColor: CARD_COLOR,
      opacity: "0.6",
    },
    inputStyle: {
      fontSize: taskFontSize,
      margin: "1rem"
    },
    documentType: "task"
  }
  
  return (
    <div className="d-flex flex-column mt-4 ms-2 me-2"
      style={{
        gap: "0.5rem"
      }}
    >
      {tasks.map((task, index) => {
        return index !== tasks.length - 1 ? (
          <TaskCard key={task._id}
            props={taskCardProps}
          />
        ):
        (
          <React.Fragment key={task._id} >
            <TaskCard props={taskCardProps} />
            <CreateDocument props={createCardProps} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

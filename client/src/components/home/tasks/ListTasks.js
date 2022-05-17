import React, { useEffect, useState, useRef } from "react"
import { useTasks } from "../../../hooks/documents/TasksProvider"
import TaskCard from "./TaskCard"
import CreateDocument from "../../CreateDocument"

const CARD_COLOR = "#ababab"

export default function ListTasks({ props, list_id }) {
  const {
    taskFontSize
  } = props

  const {
    listTasks,
    fetchTasks,
    createTask
  } = useTasks()

  const [ message, setMessage ] = useState("")
  const [ isCreatingTask, setIsCreatingTask ]= useState(false)
  const title = useRef()

  useEffect(() => {
    const fetchData = async () => {
      await fetchTasks(list_id)
    }

    fetchData()
  }, [])

  const addTask = async (e = null) => {
    if (e !== null && e.key !== "Enter")
      return

    setIsCreatingTask(false)
    // Add task
    try {
      setMessage(await createTask({
        list_id: list_id,
        description: title.current.value
      }))

      await fetchTasks(list_id)
    } catch (e) {
      setMessage(e)
    }
  }

  const taskCardProps = {
    taskFontSize: taskFontSize,
    refreshTasks: () => fetchTasks(list_id)
  }
  const createCardProps = {
    addDocument: addTask,
    isCreatingDocument: isCreatingTask,
    setIsCreatingDocument: setIsCreatingTask,
    title: title,

    cardClassName: "task-card editable-title mb-2 me-1",
    cardStyle: {
      backgroundColor: CARD_COLOR,
      opacity: "0.6"
    },
    textClassName: "m-2",
    textStyle: {
      fontSize: taskFontSize,
      color: "white"
    },
    cardEditingClassName: "me-1 pb-3 mb-2 task-card d-flex align-items-center flex-column",
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
    <div className="d-flex flex-column"
      style={{
        gap: "0.5rem",
        overflow: "scroll",
        maxHeight: "23rem"
      }}
    >
      {listTasks.map((task, index) => {
        return index !== listTasks.length - 1 ? (
          <TaskCard key={task._id}
            props={taskCardProps}
            task={task}
          />
        ):
        (
          <React.Fragment key={task._id} >
            <TaskCard props={taskCardProps}
              task={task}
            />
            <CreateDocument props={createCardProps} />
          </React.Fragment>
        )
      })}
      {listTasks.length === 0 ?
      <CreateDocument props={createCardProps} />
      :<></>}
    </div>
  )
}

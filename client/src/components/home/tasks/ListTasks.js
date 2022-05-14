import React from "react"
import TaskCard from "./TaskCard"
import CreateTaskCard from "./CreateTaskCard"

export default function ListTasks({ props }) {
  const {
    taskFontSize
  } = props
  const taskCardProps = {
    taskFontSize: taskFontSize
  }

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
            <CreateTaskCard props={taskCardProps} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

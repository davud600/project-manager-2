import React, { useState, useRef } from "react"
import ListCard from "./ListCard"
import CreateDocument from "../../CreateDocument"

const lists = [
  {
    _id: "00123456789",
    title: "project kill john lennon list 1",
    project_id: "123456789"
  },
  {
    _id: "00123456788",
    title: "project kill john lennon list 2",
    project_id: "123456789"
  }
]

const CARD_COLOR = "grey"

export default function ProjectLists({ props }) {
  const {
    gap,
    cardFontSize,
    cardWidth,
    taskFontSize
  } = props

  const [ isCreatingList, setIsCreatingList ]= useState(false)
  const title = useRef()

  const addList = (e = null) => {
    if (e !== null && e.key !== "Enter")
      return
    
    setIsCreatingList(false)
    // Add list
  }

  const listCardProps = {
    cardFontSize: cardFontSize,
    cardWidth: cardWidth,
    taskFontSize: taskFontSize
  }
  const createCardProps = {
    addDocument: addList,
    isCreatingDocument: isCreatingList,
    setIsCreatingDocument: setIsCreatingList,
    title: title,
    cardClassName: "list-card editable-title",
    cardStyle: {
      minWidth: cardWidth,
      backgroundColor: CARD_COLOR,
      opacity: "0.6",
      cursor: "pointer"
    },
    textClassName: "m-2",
    textStyle: {
      fontSize: cardFontSize,
      color: "white"
    },
    cardEditingClassName: "list-card d-flex align-items-center flex-column",
    cardEditingStyle: {
      minWidth: cardWidth,
      backgroundColor: CARD_COLOR,
      opacity: "0.6",
    },
    inputStyle: {
      fontSize: cardFontSize,
      margin: "1rem"
    },
    documentType: "list"
  }

  return (
    <div className="d-flex flex-row mt-2 ps-2 pe-2"
      style={{
        gap: gap,
        overflow: "auto",
        height: "27rem"
      }}
    >
      {lists.map((list, index) => {
        return index !== lists.length - 1 ? (
          <ListCard key={list._id}
            props={listCardProps}
          />
        ):
        (
          <React.Fragment key={list._id} >
            <ListCard props={listCardProps} />
            <CreateDocument props={createCardProps} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

import React, { useEffect, useState, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { useLists } from "../../../hooks/documents/ListsProvider"
import ListCard from "./ListCard"
import CreateDocument from "../../CreateDocument"

const CARD_COLOR = "grey"

export default function ProjectLists({ props }) {
  const {
    gap,
    cardFontSize,
    cardWidth,
    taskFontSize
  } = props

  const {
    projectLists,
    fetchLists,
    createList
  } = useLists()

  const [ searchParams ] = useSearchParams()
  const [ message, setMessage ] = useState("")
  const [ isCreatingList, setIsCreatingList ]= useState(false)
  const title = useRef()

  useEffect(() => {
    const fetchData = async () => {
      await fetchLists(searchParams.get("project_id"))
    }

    fetchData()
  }, [])

  const addList = async (e = null) => {
    if (e !== null && e.key !== "Enter")
      return
    
    setIsCreatingList(false)
    // Add list
    try {
      setMessage(await createList({
        project_id: searchParams.get("project_id"),
        title: title.current.value
      }))

      await fetchLists(searchParams.get("project_id"))
    } catch (e) {
      setMessage(e)
    }
  }

  const listCardProps = {
    cardFontSize: cardFontSize,
    cardWidth: cardWidth,
    taskFontSize: taskFontSize,
    refreshLists: () => fetchLists(searchParams.get("project_id"))
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
      {projectLists.map((list, index) => {
        return index !== projectLists.length - 1 ? (
          <ListCard key={list._id}
            list={list}
            props={listCardProps}
          />
        ):
        (
          <React.Fragment key={list._id} >
            <ListCard list={list}
              props={listCardProps}
            />
            <CreateDocument props={createCardProps} />
          </React.Fragment>
        )
      })}
      {projectLists.length === 0 ?
      <CreateDocument props={createCardProps} />
      :<></>}
    </div>
  )
}

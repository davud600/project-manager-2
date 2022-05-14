import { useState, useRef } from "react"

const CARD_COLOR = "grey"

export default function CreateListCard({ props }) {
  const {
    cardFontSize,
    cardWidth
  } = props

  const [ isCreatingList, setIsCreatingList ]= useState(false)
  const title = useRef()

  const addList = () => {
    setIsCreatingList(false)
    // Add list
  }

  return !isCreatingList ? (
    <div className="list-card"
      style={{
        minWidth: cardWidth,
        backgroundColor: CARD_COLOR,
        opacity: "0.6"
      }}
      onClick={() => {
        setIsCreatingList(true)
      }}
    >
      <p className="m-2 fw-bold" style={{
        fontSize: cardFontSize,
        color: "white"
      }}>
        + Add list
      </p>
    </div>
  ):
  (
    <div className="list-card d-flex align-items-center flex-column"
      style={{
        minWidth: cardWidth,
        backgroundColor: CARD_COLOR,
        opacity: "0.6",
      }}
    >
      <textarea className="add-item-text-area" ref={title}
        style={{
          margin: "1rem",
        }}
        placeholder="List title"
      />
      <button className="btn btn-success"
        style={{
          color: "white"
        }}
        onClick={addList}
      >Add list</button>
    </div>
  )
}

import React from "react"
import ListCard from "./ListCard"
import CreateListCard from "./CreateListCard"

export default function ProjectLists({ props }) {
  const {
    gap,
    cardFontSize,
    cardWidth
  } = props

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

  return (
    <div className="d-flex flex-row mt-2 ms-2 me-2"
      style={{
        gap: gap,
        overflow: "auto",
        height: "27rem"
      }}
    >
      {lists.map((list, index) => {
        return index !== lists.length - 1 ? (
          <ListCard key={list._id}
            props={{
              cardFontSize: cardFontSize,
              cardWidth: cardWidth
            }}
          />
        ):
        (
          <React.Fragment key={list._id} >
            <ListCard props={{
              cardFontSize: cardFontSize,
              cardWidth: cardWidth
            }} />
            <CreateListCard props={{
              cardFontSize: cardFontSize,
              cardWidth: cardWidth
            }} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

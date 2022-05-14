import ListTasks from "../tasks/ListTasks"

export default function ListCard({ props }) {
  const {
    cardFontSize,
    cardWidth,
    taskFontSize
  } = props
  const listTasksProps = {
    taskFontSize: taskFontSize
  }

  const CARD_COLOR = "grey"

  return (
    <div className="list-card"
      style={{
        minWidth: cardWidth,
        width: cardWidth,
        backgroundColor: CARD_COLOR,
      }}
    >
      <p className="m-2 fw-bold" style={{
        fontSize: cardFontSize
      }}>
        ListCard
      </p>
      <ListTasks props={listTasksProps} />
    </div>
  )
}

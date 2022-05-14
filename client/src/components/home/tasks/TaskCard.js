
export default function TaskCard({ props }) {
  const {
    taskFontSize
  } = props

  const CARD_COLOR = "white"

  return (
    <div className="task-card"
      style={{
        backgroundColor: CARD_COLOR,
        wordWrap: "break-word"
      }}
    >
      <p className="m-2" style={{
        fontSize: taskFontSize
      }}>
        TaskCard sdpifuspiodufsiodu fospufoisdufiousdioufiodsuf
      </p>
    </div>
  )
}

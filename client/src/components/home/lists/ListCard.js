
export default function ListCard({ props }) {
  const {
    cardFontSize,
    cardWidth
  } = props

  const CARD_COLOR = "grey"

  return (
    <div className="list-card"
      style={{
        minWidth: cardWidth,
        backgroundColor: CARD_COLOR,
      }}
    >
      <p className="m-2 fw-bold" style={{
        fontSize: cardFontSize
      }}>
        ListCard
      </p>
    </div>
  )
}

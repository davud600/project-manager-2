import { useRef } from "react"
import { useOutsideAlerter } from "../hooks/OutsideAlerter"

export default function CreateDocument({ props }) {
  const {
    addDocument,
    isCreatingDocument,
    setIsCreatingDocument,
    title,
    
    cardClassName,
    cardStyle,

    textClassName,
    textStyle,

    cardEditingClassName,
    cardEditingStyle,

    inputStyle,
    documentType
  } = props

  const cardRef = useRef()
  useOutsideAlerter(cardRef, setIsCreatingDocument, false)

  return !isCreatingDocument ? (
    <div className={cardClassName}
      style={cardStyle}
      onClick={() => {
        setIsCreatingDocument(true)
      }}
    >
      <p className={textClassName} style={textStyle}>
        {`+ Add ${documentType}`}
      </p>
    </div>
  ):
  (
    <div className={cardEditingClassName}
      style={cardEditingStyle}
      ref={cardRef}
    >
      <input className="add-item-text-area" ref={title}
        style={inputStyle}
        onKeyUp={(e) => addDocument(e)}
        placeholder={`${documentType} title`}
        autoFocus={true}
      />
      <button className="btn btn-success"
        style={{
          color: "white"
        }}
        onClick={() => addDocument()}
      >{`Add ${documentType}`}</button>
    </div>
  )
}

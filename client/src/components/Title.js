
export default function Title({ props }) {
  const {
    isEditingTitle,
    setIsEditingTitle,
    titleClassName,
    titleStyle,
    title,
    newTitle,
    setNewTitle,
    editTitle,
    inputClassName,
    inputStyle,
    centered = false
  } = props

  return (
    <div className={centered ? "text-center":""}>
      {!isEditingTitle ? <p className={titleClassName}
        style={titleStyle}
        onClick={() => setIsEditingTitle(true)}
      >
        {title}
      </p>:
      <input className={inputClassName}
        style={inputStyle}
        onKeyUp={(e) => editTitle(e)}
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value)
        }}
        autoFocus={true}
      />}
    </div>
  )
}

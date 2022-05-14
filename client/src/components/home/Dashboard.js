import { useWindowDimensions } from "../../hooks/WindowDimensions"
import Header from "../Header"
import UserProjects from "./projects/UserProjects"

let isPhone, contentWidth,
pageTitleFontSize, cardFontSize,
gap, cardTextMarginLeft, numOfColumns

export default function Dashboard() {
  const { width, height } = useWindowDimensions()

  isPhone = height / width >= 16 / 16
  contentWidth = isPhone ? "75%":"60%"
  pageTitleFontSize = isPhone ? "1.5rem":"2rem"
  cardFontSize = isPhone ? ".9rem":"1.5rem"
  gap = isPhone ? "3px":"10px"
  cardTextMarginLeft = isPhone ? "5px":"10px"
  numOfColumns = isPhone ? "2":"3"

  const userProjectsProps = {
    fontSize: cardFontSize,
    gap: gap,
    cardTextMarginLeft,
    numOfColumns
  }

  return (
    <div style={{
      backgroundColor: "#f5f5f7",
      height: height
    }}>
      <Header />
      <div className="d-flex justify-content-center text-center">
        <div style={{
          width: contentWidth
        }}>
          <p className="display-6 mt-4" style={{
            fontSize: pageTitleFontSize
          }}
          >Dashboard</p>
          <UserProjects props={userProjectsProps} />
        </div>
      </div>
    </div>
  )
}

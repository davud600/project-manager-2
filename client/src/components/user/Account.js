import { useEffect } from "react"
import { useAuth } from "../../hooks/Auth"
import { useWindowDimensions } from "../../hooks/WindowDimensions"
import Header from "../Header"

const BACKGROUND_COLOR = "#f5f5f7"

export default function Account() {
  const { user, authorizeUser } = useAuth()
  const { height } = useWindowDimensions()

  useEffect(() => {
    authorizeUser()
  }, [])

  return (
    <div style={{
      backgroundColor: BACKGROUND_COLOR,
      height: height
    }}
      className=""
    >
      <Header />
      <div className="mt-5 d-flex justify-content-center">
        <p className="display-6">Account name: {user.name}</p>
      </div>
    </div>
  )
}

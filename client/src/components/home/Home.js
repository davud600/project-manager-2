import { useNavigate } from "react-router-dom"
import { useWindowDimensions } from "../../hooks/WindowDimensions"

const BACKGROUND_COLOR = "#f5f5f7"

export default function Home() {
  const navigate = useNavigate()
  const { height } = useWindowDimensions()
  
  return (
    <div style={{
      backgroundColor: BACKGROUND_COLOR,
      height: height
    }}
      className="d-flex flex-column justify-content-center text-center"
    >
      <div className="m-0 p-0">
        <p className="display-3">Home</p>
      </div>
      <div className="mt-5">
        <p className="h4">Create an account: </p>
        <a href="/signup"
        className="m-0 p-0 btn btn-link">Sign Up</a>
      </div>
      <div className="mt-5 mb-5">
        <p className="h4">Already have an account? Log in: </p>
        <a href="/login"
        className="m-0 p-0 btn btn-link">Log In</a>
      </div>
    </div>
  )
}

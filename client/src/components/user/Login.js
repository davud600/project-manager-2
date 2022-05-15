import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useWindowDimensions } from "../../hooks/WindowDimensions"

let isPhone, contentWidth

export default function Login() {
  const { width, height } = useWindowDimensions()
  const navigate = useNavigate()

  const BACKGROUND_COLOR = "#f5f5f7"
  const INPUT_BOX_COLOR = "white"
  const MAIN_TEXT_COLOR = "black"
  const BUTTON_COLOR = "blue"
  
  isPhone = height / width >= 16 / 16
  contentWidth = isPhone ? "75%":"60%"

  return (
    <div className="w-100 d-flex justify-content-center" style={{
      backgroundColor: BACKGROUND_COLOR,
      height: height
    }}>
      <Form className="mt-5" style={{
        width: contentWidth,
        color: MAIN_TEXT_COLOR
      }}>
        <p className="display-6 p-0 mb-5">LOG IN</p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter Username"
            style={{
              backgroundColor: INPUT_BOX_COLOR,
              color: "black",
              // border: "none"
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            style={{
              backgroundColor: INPUT_BOX_COLOR,
              color: "black",
              // border: "none"
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" style={{
          backgroundColor: BUTTON_COLOR,
          border: "none",
          marginTop: ".5rem"
        }}>
          Submit
        </Button>
        <Form.Label className="ms-4">Don't have an account?</Form.Label>
        <a className="ms-3 p-0 btn-link"
          style={{
            cursor: "pointer"
          }}
          onClick={() => navigate('/signup')}
        >Sign Up</a>
      </Form>
    </div>
  )
}

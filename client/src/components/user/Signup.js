import { Form, Button } from "react-bootstrap"
import { useWindowDimensions } from "../../hooks/WindowDimensions"
import { useColors } from "../../hooks/Colortheme"

let isPhone, contentWidth

export default function Signup() {
  const { width, height } = useWindowDimensions()
  const {
    color4,
    color5,
    color6
  } = useColors()

  const BACKGROUND_COLOR = color6
  const INPUT_BOX_COLOR = color5
  const MAIN_TEXT_COLOR = color4
  const BUTTON_COLOR = color4
  
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
        <p className="display-6 p-0 mb-5">SIGN UP</p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter Username"
            style={{
              backgroundColor: INPUT_BOX_COLOR,
              color: "white",
              border: "none"
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            style={{
              backgroundColor: INPUT_BOX_COLOR,
              color: "white",
              border: "none"
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password"
            style={{
              backgroundColor: INPUT_BOX_COLOR,
              color: "white",
              border: "none"
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{
          backgroundColor: BUTTON_COLOR,
          border: "none",
          marginTop: ".5rem"
        }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

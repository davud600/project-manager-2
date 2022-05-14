import { useLocation } from "react-router-dom"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"

const NAVBAR_COLOR = "#333333"

export default function Header() {
  const location = useLocation()

  return (
    <Navbar className="pt-1 pb-1 justify-content-center" variant="dark" expand="lg" style={{
      backgroundColor: NAVBAR_COLOR
    }}>
      <Container className="m-0" style={{
        width: "fit-content"
      }}>
        <Navbar.Brand href="/" className="fw-bold"
        >Prello</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard" style={{
              color: location.pathname === '/dashboard' ? "white":""
            }}>Dashboard</Nav.Link>
            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item href="/account">Account Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

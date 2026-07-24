import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>LeadTap Property CRM</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to="/leads">
              Leads
            </Nav.Link>

            <Nav.Link as={Link} to="/properties">
              Properties
            </Nav.Link>

            <Nav.Link as={Link} to="/settings">
              Settings
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
}
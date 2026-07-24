import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("adminToken");
    navigate("/login");
  }

  return (
    <>

      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>

          <Navbar.Brand>
            LeadTap Property CRM
          </Navbar.Brand>

          <Nav className="me-auto">

            <Nav.Link as={Link} to="/dashboard">
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

          <Button 
            variant="outline-light"
            onClick={logout}
          >
            Logout
          </Button>

        </Container>
      </Navbar>


      <Container className="mt-4">
        <Outlet />
      </Container>

    </>
  );
}
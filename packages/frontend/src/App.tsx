import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import Routes from './Routes.tsx';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AppContext } from './lib/contextLib';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  function handleLogout() {
    userHasAuthenticated(false);
  }

  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
        <Navbar.Brand as={Link} to="/" className="fw-bold text-muted">
          Scratch
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider
        value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
      >
        <Routes />
      </AppContext.Provider>
    </div>
  );
}
export default App;

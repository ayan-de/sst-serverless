import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { AppContext, AppContextType } from './lib/contextLib';
// import { LinkContainer } from "react-router-bootstrap";
import './App.css';
import Routes from './Routes.tsx';
function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  function handleLogout() {
    userHasAuthenticated(false);
  }
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
        <Navbar.Brand className="fw-bold text-muted">NotesApp</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {/* {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <> */}
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            {/* </>
            )} */}
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

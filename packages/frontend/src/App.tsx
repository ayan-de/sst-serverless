import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import Routes from './Routes.tsx';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppContext, type AppContextType } from './lib/contextLib';
import { Auth } from 'aws-amplify';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);
    nav('/login');
  }

  return (
    !isAuthenticating && (
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
    )
  );
}
export default App;

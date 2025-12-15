import React, { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Global styles

function App() {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit'
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // To force re-fetch

  // Handlers to switch views and trigger data refresh
  const handleMovieAdded = () => {
    setRefreshTrigger(prev => prev + 1);
    setCurrentView('list');
  };

  const handleMovieUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
    setCurrentView('list');
    setEditingMovieId(null);
  };

  const handleEdit = (movieId) => {
    setEditingMovieId(movieId);
    setCurrentView('edit');
  };

  const handleAddNew = () => {
    setCurrentView('add');
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingMovieId(null);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand onClick={() => setCurrentView('list')} style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.5rem' }}>
            🎬 MovieReel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button variant="outline-light" onClick={handleAddNew}>+ Add New Movie</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="py-5">
        <Container>
          {currentView === 'list' && (
            <MoviesList
              key={refreshTrigger} // Re-mounts the component when the key changes
              onEdit={handleEdit}
              onAddNew={handleAddNew} // Pass handler for the add button inside the list view
            />
          )}
          {currentView === 'add' && (
            <AddMovie
              onMovieAdded={handleMovieAdded}
              onCancel={handleCancel}
            />
          )}
          {currentView === 'edit' && editingMovieId && (
            <EditMovie
              movieId={editingMovieId}
              onMovieUpdated={handleMovieUpdated}
              onCancel={handleCancel}
            />
          )}
        </Container>
      </main>

      <footer className="text-center py-4 bg-dark text-white">
          <p>&copy; {new Date().getFullYear()} MovieReel. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default App;

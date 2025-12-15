import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit'
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
      <Navbar bg="dark" data-bs-theme="dark" className="mb-4">
        <Container>
          <Navbar.Brand onClick={() => setCurrentView('list')} style={{ cursor: 'pointer' }}>
            🎬 Movie Collection App
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link onClick={() => setCurrentView('list')}>
              Movie List
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <main>
        {currentView === 'list' && (
          <MoviesList
            key={refreshTrigger}
            onEdit={handleEdit}
            onAddNew={handleAddNew}
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
      </main>
    </>
  );
}

export default App;

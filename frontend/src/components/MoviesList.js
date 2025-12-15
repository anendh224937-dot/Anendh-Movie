import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Alert, Spinner } from 'react-bootstrap';
import '../styles/MoviesList.css';

const MoviesList = ({ onEdit, onAddNew }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch movies
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/movies');
      setMovies(response.data.movies);
      setError('');
    } catch (err) {
      setError('Error loading movies. Please check if the API is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/movies/${id}`);
      setMovies(movies.filter(movie => movie._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Error deleting movie');
    }
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Movie Collection</h1>
        <Button variant="success" size="lg" onClick={onAddNew}>
          + Add New Movie
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" /> Loading movies...
        </div>
      ) : movies.length === 0 ? (
        <Alert variant="info">
          No movies added yet. <Button onClick={onAddNew}>Add your first movie!</Button>
        </Alert>
      ) : (
        <Row className="g-4">
          {movies.map(movie => (
            <Col key={movie._id} md={6} lg={4}>
              <Card className="movie-card h-100 shadow-sm">
                <Card.Img variant="top" src={movie.posterURL} alt={movie.title} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-2">{movie.title}</Card.Title>
                  <Card.Text className="text-muted">
                    <strong>Genre:</strong> {movie.genre}
                  </Card.Text>
                  <Card.Text className="text-muted mb-3">
                    <strong>Year:</strong> {movie.releaseYear}
                  </Card.Text>
                  <div className="mt-auto d-flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-grow-1"
                      onClick={() => onEdit(movie._id)}
                    >
                      Edit
                    </Button>
                    {deleteConfirm === movie._id ? (
                      <>
                        <Button
                          variant="danger"
                          size="sm"
                          className="flex-grow-1"
                          onClick={() => handleDelete(movie._id)}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setDeleteConfirm(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="danger"
                        size="sm"
                        className="flex-grow-1"
                        onClick={() => setDeleteConfirm(movie._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MoviesList;

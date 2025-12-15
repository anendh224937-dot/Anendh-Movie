import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Alert, Spinner, Form } from 'react-bootstrap';
import '../styles/MoviesList.css';

const MoviesList = ({ onEdit, onAddNew }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title'); // Default sort by title

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
      setError('Error loading movies. Please ensure the backend is running and accessible.');
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
      setError('Error deleting movie. Please try again.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const processedMovies = useMemo(() => {
    let filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'releaseYear') {
        return b.releaseYear - a.releaseYear;
      } else if (sortBy === 'genre') {
        return a.genre.localeCompare(b.genre);
      }
      return 0;
    });

    return filtered;
  }, [movies, searchTerm, sortBy]);

  return (
    <Container className="my-5">
      <Row className="mb-4 align-items-center">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="lg"
          />
        </Col>
        <Col md={4}>
          <Form.Select onChange={handleSortChange} value={sortBy} size="lg">
            <option value="title">Sort by Title</option>
            <option value="releaseYear">Sort by Year</option>
            <option value="genre">Sort by Genre</option>
          </Form.Select>
        </Col>
      </Row>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Fetching your movie collection...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center p-5 border rounded bg-light">
          <h2>Your Collection is Empty</h2>
          <p>It looks like you haven't added any movies yet. Let's get started!</p>
          <Button variant="primary" size="lg" onClick={onAddNew}>
            + Add Your First Movie
          </Button>
        </div>
      ) : processedMovies.length === 0 ? (
        <Alert variant="info">
          No movies found matching your search or filter criteria.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-5">
          {processedMovies.map(movie => (
            <Col key={movie._id}>
              <Card className="movie-card h-100 shadow-lg border-0">
                <Card.Img variant="top" src={movie.posterURL} alt={movie.title} />
                <Card.Body className="d-flex flex-column p-4">
                  <Card.Title className="mb-2 h5">{movie.title}</Card.Title>
                  <Card.Text className="text-muted small">
                    {movie.genre} &bull; {movie.releaseYear}
                  </Card.Text>

                  <div className="mt-auto pt-3">
                    {deleteConfirm === movie._id ? (
                      <div className="d-grid gap-2">
                        <p className="text-center text-danger small mb-2">Are you sure?</p>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-danger"
                            className="w-100"
                            onClick={() => handleDelete(movie._id)}
                          >
                            Yes, Delete
                          </Button>
                          <Button
                            variant="outline-secondary"
                            className="w-100"
                            onClick={() => setDeleteConfirm(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="d-grid gap-2">
                        <Button
                          variant="outline-primary"
                          onClick={() => onEdit(movie._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => setDeleteConfirm(movie._id)}
                        >
                          Delete
                        </Button>
                      </div>
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

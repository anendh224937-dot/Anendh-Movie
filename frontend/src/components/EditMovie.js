import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';

const EditMovie = ({ movieId, onMovieUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    posterURL: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch movie data
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/movies/${movieId}`);
        const { movie } = response.data;

        if (movie) {
          setFormData({
            title: movie.title,
            genre: movie.genre,
            releaseYear: movie.releaseYear,
            posterURL: movie.posterURL
          });
        }
      } catch (err) {
        setError('Error loading movie data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'releaseYear' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.title || !formData.genre || !formData.releaseYear || !formData.posterURL) {
        setError('All fields are required');
        setSaving(false);
        return;
      }

      const response = await axios.put(`/api/movies/${movieId}`, formData);
      setSuccess('Movie updated successfully!');
      
      onMovieUpdated(response.data.movie);

      setTimeout(() => {
        setSuccess('');
      }, 3000);

    } catch (err) {
      setError(err.response?.data?.message || 'Error updating movie. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
        <p className="mt-2">Loading movie details...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: '700px' }}>
      <Card className="p-4 p-md-5 shadow-lg border-0">
        <h1 className="text-center mb-4">Edit Movie Details</h1>

        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Movie Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              size="lg"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              size="lg"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Release Year</Form.Label>
            <Form.Control
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              min="1888"
              max={new Date().getFullYear()}
              required
              size="lg"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Poster Image URL</Form.Label>
            <Form.Control
              type="url"
              name="posterURL"
              value={formData.posterURL}
              onChange={handleChange}
              required
              size="lg"
            />
          </Form.Group>

          <div className="d-grid gap-3">
            <Button variant="primary" type="submit" disabled={saving} size="lg">
              {saving ? 'Saving Changes...' : 'Save Changes'}
            </Button>
            <Button variant="outline-secondary" onClick={onCancel} size="lg">
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditMovie;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

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
        const response = await axios.get(`/api/movies`);
        const movie = response.data.movies.find(m => m._id === movieId);
        if (movie) {
          setFormData({
            title: movie.title,
            genre: movie.genre,
            releaseYear: movie.releaseYear,
            posterURL: movie.posterURL
          });
        }
      } catch (err) {
        setError('Error loading movie data');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
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
        <p>Loading movie details...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">Edit Movie</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Movie Title *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Genre *</Form.Label>
            <Form.Control
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Release Year *</Form.Label>
            <Form.Control
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Poster Image URL *</Form.Label>
            <Form.Control
              type="url"
              name="posterURL"
              value={formData.posterURL}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default EditMovie;

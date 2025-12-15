import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const AddMovie = ({ onMovieAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    posterURL: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'releaseYear' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validation
      if (!formData.title || !formData.genre || !formData.releaseYear || !formData.posterURL) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      const response = await axios.post('/api/movies', formData);
      setSuccess('Movie added successfully!');
      setFormData({
        title: '',
        genre: '',
        releaseYear: new Date().getFullYear(),
        posterURL: ''
      });
      onMovieAdded(response.data.movie);
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">Add New Movie</h2>

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
              placeholder="Enter movie title"
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
              placeholder="e.g., Action, Drama, Comedy"
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
              placeholder="https://example.com/poster.jpg"
              required
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Movie'}
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

export default AddMovie;

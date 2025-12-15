import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

const AddMovie = ({ onMovieAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    posterURL: ''
  });

  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.title || !formData.genre || !formData.releaseYear || !formData.posterURL) {
        setError('Please fill out all fields.');
        setSubmitting(false);
        return;
      }

      const response = await axios.post('/api/movies', formData);
      setSuccess('Movie successfully added to your collection!');
      
      // Clear form
      setFormData({
        title: '',
        genre: '',
        releaseYear: new Date().getFullYear(),
        posterURL: ''
      });

      // Notify parent to refresh and switch view
      onMovieAdded(response.data.movie);

      setTimeout(() => setSuccess(''), 4000); // Hide success message after 4s

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add movie. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: '700px' }}>
      <Card className="p-4 p-md-5 shadow-lg border-0">
        <h1 className="text-center mb-4">Add a New Movie</h1>

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
              placeholder="e.g., The Matrix"
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
              placeholder="e.g., Sci-Fi"
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
              min="1888" // First movie ever made
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
              placeholder="https://example.com/image.png"
              required
              size="lg"
            />
          </Form.Group>

          <div className="d-grid gap-3">
            <Button variant="primary" type="submit" disabled={submitting} size="lg">
              {submitting ? 'Adding Movie...' : 'Add to Collection'}
            </Button>
            <Button variant="outline-secondary" onClick={onCancel} size="lg">
              Back to List
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddMovie;

const express = require('express');
const router = express.Router();
const {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

// POST /api/movies - Add a new movie
router.post('/', addMovie);

// GET /api/movies - Get all movies
router.get('/', getAllMovies);

// GET /api/movies/:id - Get a single movie by ID
router.get('/:id', getMovieById);

// PUT /api/movies/:id - Update a movie
router.put('/:id', updateMovie);

// DELETE /api/movies/:id - Delete a movie
router.delete('/:id', deleteMovie);

module.exports = router;

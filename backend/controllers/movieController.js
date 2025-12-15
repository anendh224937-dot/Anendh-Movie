const Movie = require('../models/Movie');

// Add a new movie
exports.addMovie = async (req, res) => {
  try {
    const { title, genre, releaseYear, posterURL } = req.body;

    // Validation
    if (!title || !genre || !releaseYear || !posterURL) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMovie = new Movie({
      title,
      genre,
      releaseYear,
      posterURL
    });

    const savedMovie = await newMovie.save();
    res.status(201).json({
      message: 'Movie added successfully',
      movie: savedMovie
    });
  } catch (error) {
    res.status(400).json({ message: 'Error adding movie', error: error.message });
  }
};

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: 'Movies retrieved successfully',
      count: movies.length,
      movies: movies
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving movies', error: error.message });
  }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({
      message: 'Movie retrieved successfully',
      movie: movie
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving movie', error: error.message });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, releaseYear, posterURL } = req.body;

    // Validation
    if (!title || !genre || !releaseYear || !posterURL) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, genre, releaseYear, posterURL },
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({
      message: 'Movie updated successfully',
      movie: updatedMovie
    });
  } catch (error) {
    res.status(400).json({ message: 'Error updating movie', error: error.message });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({
      message: 'Movie deleted successfully',
      movie: deletedMovie
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error: error.message });
  }
};

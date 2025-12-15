const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a movie title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    genre: {
      type: String,
      required: [true, 'Please provide a genre'],
      trim: true
    },
    releaseYear: {
      type: Number,
      required: [true, 'Please provide a release year'],
      min: [1900, 'Release year must be 1900 or later'],
      max: [new Date().getFullYear(), 'Release year cannot be in the future']
    },
    posterURL: {
      type: String,
      required: [true, 'Please provide a poster image URL'],
      match: [/^https?:\/\/.+/, 'Please provide a valid URL']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Movie', movieSchema);

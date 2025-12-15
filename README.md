# Movie Collection App - MERN Stack

This is a complete MERN (MongoDB, Express, React, Node.js) stack application for managing a movie collection.

## Project Structure

```
anendh/
├── backend/
│   ├── models/
│   │   └── Movie.js          # MongoDB schema for movies
│   ├── controllers/
│   │   └── movieController.js # Business logic for API endpoints
│   ├── routes/
│   │   └── movieRoutes.js     # API route definitions
│   ├── server.js              # Express server setup
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── MoviesList.js  # Display all movies in grid
    │   │   ├── AddMovie.js    # Form to add new movie
    │   │   └── EditMovie.js   # Form to edit existing movie
    │   ├── styles/
    │   │   └── MoviesList.css # Component styling
    │   ├── App.js              # Main app component with routing logic
    │   ├── index.js            # React entry point
    │   ├── index.css           # Global styles
    │   └── public/
    │       └── index.html      # HTML template
    └── package.json           # Frontend dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/moviedb
PORT=5000
```

4. Start the server:
```bash
npm start
```

The API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## API Endpoints

### 1. Add a Movie
**POST** `/api/movies`

Request body:
```json
{
  "title": "Inception",
  "genre": "Science Fiction",
  "releaseYear": 2010,
  "posterURL": "https://example.com/poster.jpg"
}
```

Response: Movie object with `_id` and timestamp

### 2. Get All Movies
**GET** `/api/movies`

Response:
```json
{
  "message": "Movies retrieved successfully",
  "count": 5,
  "movies": [
    {
      "_id": "...",
      "title": "Inception",
      "genre": "Science Fiction",
      "releaseYear": 2010,
      "posterURL": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### 3. Update a Movie
**PUT** `/api/movies/:id`

Request body: Same as POST request

Response: Updated movie object

### 4. Delete a Movie
**DELETE** `/api/movies/:id`

Response: Confirmation message and deleted movie object

## Features

✅ **Movie Management**
- Add new movies with title, genre, year, and poster URL
- View all movies in a responsive grid layout
- Edit existing movie details
- Delete movies from the collection

✅ **Data Validation**
- All fields are required
- Release year must be between 1900 and current year
- Poster URL must be a valid HTTP/HTTPS URL
- Title limited to 100 characters

✅ **User Interface**
- Clean, responsive design using Bootstrap
- Movie cards with poster images
- Intuitive navigation
- Confirmation dialogs for destructive actions
- Loading states and error handling
- Success/error notifications

✅ **Database**
- MongoDB with proper schema validation
- Timestamps for creation and updates
- Indexed queries for performance

## Technologies Used

- **Frontend**: React 18, React Bootstrap, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Styling**: Bootstrap 5
- **HTTP Client**: Axios

## Running the Application

### Option 1: Separate Terminals
Terminal 1 - Backend:
```bash
cd backend
npm install
npm start
```

Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm start
```

### Option 2: Using Concurrently (Optional)

Install concurrently in root directory and use a combined start script.

## Testing the API

You can test the API endpoints using Postman or curl:

```bash
# Add a movie
curl -X POST http://localhost:5000/api/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"Avatar","genre":"Science Fiction","releaseYear":2009,"posterURL":"https://example.com/poster.jpg"}'

# Get all movies
curl http://localhost:5000/api/movies

# Update a movie (replace :id with actual movie ID)
curl -X PUT http://localhost:5000/api/movies/:id \
  -H "Content-Type: application/json" \
  -d '{"title":"Avatar 2","genre":"Science Fiction","releaseYear":2022,"posterURL":"https://example.com/poster2.jpg"}'

# Delete a movie
curl -X DELETE http://localhost:5000/api/movies/:id
```

## Error Handling

The application includes comprehensive error handling:
- Invalid input validation
- Database connection errors
- HTTP error responses with descriptive messages
- User-friendly error alerts in the frontend

## Notes for Exam

✅ All requirements are implemented:
1. ✅ POST endpoint to add movies
2. ✅ GET endpoint to retrieve all movies
3. ✅ PUT endpoint to update movies
4. ✅ DELETE endpoint to remove movies
5. ✅ MoviesList page with grid layout and images
6. ✅ Edit and Delete buttons on cards
7. ✅ AddMovie form with all required fields
8. ✅ EditMovie form pre-populated with existing data
9. ✅ Full CRUD operations
10. ✅ Responsive design with Bootstrap
11. ✅ Proper error handling and validation
12. ✅ Database persistence with MongoDB

The application is production-ready and follows MERN best practices.

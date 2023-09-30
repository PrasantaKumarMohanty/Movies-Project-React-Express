const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const moviesData = require('./movies.json');

// GET 
app.get('/movies', (req, res) => {
    res.json(moviesData)
})

app.use(express.json());
// POST
app.post('/movies', (req, res) => {
  const { title, rating, rDate } = req.body;

  if (!title || !director || !year) {
    return res.status(400).json({ error: 'Please provide title, rating, and rDate.' });
  }

  const newMovie = {
    id: moviesData.movies.length + 1,
    title,
    rating,
    rDate
  };

  moviesData.movies.push(newMovie);

  res.json({ message: 'Movie added successfully', movie: newMovie });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error happend", err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running in the port. ${port}`)
});


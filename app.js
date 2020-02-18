const express = require('express');
const morgan = require('morgan');
const playStore = require('./playstore');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req, res) => {
  let apps = playStore;

  const validGenres = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];
  if('genre' in req.query && !validGenres.includes(req.query.genre.toLowerCase())) {
    res.status(400).json({message: 'Genre must be one of these: action, puzzle, strategy, casual, arcade, card'});
  }

  if(req.query.genre) {
    apps = playStore.filter(app => app.Genres.toLowerCase().includes(req.query.genre.toLowerCase()));
  }

  const validSort = ['rating', 'app'];
  if('sort' in req.query && !validSort.includes(req.query.sort.toLowerCase())) {
    res.status(400).json({message: 'Sort must be either `rating` or `app`'});
  }

  if(req.query.sort) {
    apps.sort((a, b) => {
      return a[req.query.sort] < b[req.query.sort] ? -1 : 1;
    });
  }

  res.json(apps);
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
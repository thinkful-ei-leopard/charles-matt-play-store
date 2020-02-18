const express = require('express');
const morgan = require('morgan');
const playStore = require('./playstore');

const app = express();

app.use(morgan('dev'));



app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const mongoDbString = require('./src/config/config')

const todoRoutes = require('./src/Routes/apiTodoRoutes')
const TodoFavorites = require('./src/Routes/apiTodoFavorites');
const blogRoutes = require('./src/Routes/apiBlog')

const cors = require('cors')

const PORT  = '3001'

mongoose
  .connect(mongoDbString, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
      console.log('Connected to db');
      app.listen(PORT)

  })

app.use(cors())

  // for req.body to work
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/todo', todoRoutes);
app.use('/api/todo/favorites', TodoFavorites);
app.use('/api/blog', blogRoutes);

// 404 case - kai vartojas ivede psl kurio nera
app.use((req, res) => res.status(404).send('OOPs Page not found'));




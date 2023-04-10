const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan') 
const blogRoutes = require('./routes/blogRoutes')

const app = express()

const DB_URI = 'mongodb+srv://blog-creator:blog321@cluster0.1iooq.mongodb.net/my-blog?retryWrites=true&w=majority';

mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
  console.log('connected')
})
.catch((err) => {
  console.log(err)
})

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({extended: true }))
app.use(morgan('dev'))

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

app.get('/', (req, res) => {
  res.redirect('/blogs')
})
app.get('/about', (req, res) => {
  res.render('about', {title:"About"})
})

app.use('/blogs', blogRoutes)

app.use((req, res) => {
  res.status(404).render('404', {title: '404'})
})

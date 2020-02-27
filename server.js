'use strict'

const express = require ('express');
const app = express();

require('dotenv').config();

const superagent = require ('superagent');

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err=>console.error(err));

const PORT = process.env.PORT || 3001;


// Getting that EJS stuff on the page
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', handleHome);
app.get('/test', handleTest);
app.get('/searches/new', handleNewSearch);
app.post('/searches', collectFormData);
app.get('*', (request, response) => {
  response.status(404).render('./pages/error', {errorMessage: 'Page not found'});
})


// Go home!
function handleHome(request, response){
  let sql = 'SELECT * FROM books;';
  
  client.query(sql)
    .then(results=>{
      let resultsData = results.rows;
      response.render('./pages/index', {books: resultsData});
    })
    .catch((err) => {
      console.error('Error when getting form data: ', err);
      response.status(500).render('./pages/error', {errorMessage: 'Could not retrieve book results'});
    });
};

// Just in case things go wrong.
function handleTest(request, response){
  response.render('./pages/index.ejs');
  console.log('This is the test route calling. Something is not right. Pick up your phone!');
};

function handleNewSearch(request, response){
  response.render('./pages/searches/new.ejs');
};

function collectFormData(request, response){

  let formData = request.body.search;
  let searchText = formData[0];
  let authorOrTitle = formData[1];

  let url = `https://www.googleapis.com/books/v1/volumes?&maxResults=10&q=`;
  if(authorOrTitle === 'title'){
      url += `+intitle:${searchText}`;
  }else if(authorOrTitle === 'author'){
      url += `+inauthor:${searchText}`;
  }

  superagent.get(url)
  .then(results => {
    let bookInfoArray = results.body.items;
    console.log(bookInfoArray);
    let responseData = bookInfoArray.map(info => {
        return new Book(info.volumeInfo);
      })
      response.status(200).render('./pages/searches/show.ejs', {books: responseData});
    })
  .catch((err) => {
    console.error('Error when getting form data: ', err);
    response.status(500).render('./pages/error', {errorMessage: 'Could not retrieve book results'});
  })
}
   


function Book(obj){
  this.title = obj.title ? obj.title : 'No title for you.';
  this.authors = obj.authors.join(', ');
  this.description = obj.description;
  if(obj.imageLinks && obj.imageLinks.thumbnail){ // short-circuit evaluation
      this.imageurl = obj.imageLinks.thumbnail;
  } else{
      this.imageurl = '/images/default.jpg';
  }
  this.imageurl = this.imageurl.slice(0,5)==='http:' ? 'https:'+this.imageurl.slice(5) : this.imageurl;
}
// Turn this thing ONNNN!
// client.connect()
//   .then(()=>{
    app.listen(PORT, () => {
      console.log(`Yo Yo Yo. Mike check one two, one two. Listening on ${PORT}`);
    })
//   })
//   .catch((err) => {
//     console.error('Error when connecting to database', err);
//     response.status(500).render('./pages/error', {errorMessage: 'Could not connect to database'});
//   })
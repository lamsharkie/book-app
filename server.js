'use strict'

const express = require ('express');
const app = express();

require('dotenv').config();

const superagent = require ('superagent');

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3001;


// Getting that EJS stuff on the page
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

// app.get('/', handle)

// Go home!
app.get('/', (request, response) => {
    response.render('./pages/index.ejs');
})

// Just in case things go wrong.
app.get('/test', (request, response) => {
    response.render('./pages/index.ejs');
    console.log('This is the test route calling. Something is not right. Pick up your phone!');
})

app.get('/searches/new', (request, response)=> {
    response.render('./pages/searches/new.ejs');
})

app.post('/searches', collectFormData);

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
            // console.log('book results', results);
        let responseData = bookInfoArray.map(info => {
                return new Book(info.volumeInfo)
            })
            response.render('./pages/searches/show.ejs', {books: responseData});
        })

}
   


function Book(obj){
    this.title = obj.title ? obj.title : 'No title for you.';
    this.authors_names = obj.authors;
    this.description = obj.description;
    if(obj.imageLinks){
        this.imageurl = obj.imageLinks.thumbnail ? obj.imageLinks.thumbnail : url('/public/images/default.png');
    }
    
   
}
// Turn this thing ONNNN!
app.listen(PORT, () => {
    console.log(`Yo Yo Yo. Mike check one two, one two. Listening on ${PORT}`);
})
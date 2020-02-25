'use strict'

const express = require ('express');
const app = express();

require('dotenv').config();

const superagent = require ('superagent');
// app.use('superagent');

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3001;


// Getting that EJS stuff on the page
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs');


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
    response.render('./pages/searches/new.ejs')
})



// Turn this thing ONNNN!
app.listen(PORT, () => {
    console.log(`Yo Yo Yo. Mike check one two, one two. Listening on ${PORT}`);
})
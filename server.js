'use strict'

const express = require ('express');
const app = express();

require('dotenv').config();

const superagent = require ('superagent');
// app.use('superagent');

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.get('/', (request, response) => {
    response.render('./pages/index.ejs');
})

app.get('/test', (request, response) => {
    response.render('./pages/index.ejs');
    console.log('This is the test route calling. Something is not right. Pick up your phone!');
})

app.listen(PORT, () => {
    console.log(`Yo Yo Yo. Mike check one two, one two. Listening on ${PORT}`);
})
# book-app

**Authors**: Andrew Casper and Brandon Gibbs
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
This app looks up written works by author or title from user input. It retrieves this data from the google books API.

## Getting Started
To get started using this server, you will need to do three things:
- npm install to install all dependencies
- Create a .env file with two variables: PORT and DATABASE_URL
- Create a database and use its address for DATABASE_URL

## Architecture
This app is built using an express server created in node and written in javascript. It uses dependencies including express for the server, dotenv for private environment vars, superagent for making API calls, and EJS for server-side page rendering. It makes calls to the google books API for data.

## Change Log
02-25-2020 9:45am: initial creation of files
02-25-2020 2:00pm: Server now retrieves api results
02-26-2020 1:30pm: Server now retrieves book collection from database
02-27-2020 1:15pm: Server now uses partials for pages and hides elements depending on page
02-28-2020 1:00am: Detail page now allows updating of book data
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with GET and POST routes for the book resource.-->

## Credits and Collaborations
https://books.google.com/

Number and name of feature: Lab 11 - EJS

Estimate of time needed to complete: 5 hours

Start time: 9:00am

Finish time: 11:00am next day

Actual time needed to complete: 7 hours


Number and name of feature: Lab 12 - Components and Forms

Estimate of time needed to complete: 2 hours

Start time: Noon

Finish time: Noon next day

Actual time needed to complete: 7 hours

Number and name of feature: Lab 13 - update and delete

Estimate of time needed to complete: 4 hours

Start time: 1pm

Finish time: ----

Actual time needed to complete: ----


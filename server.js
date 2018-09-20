const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//order of app.use is important

//log requests
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  
  next();
});

//show maintainence page
//app.use((req, res, next) => {
//  res.render('maintainence.hbs', {
//    welcomeMessage: 'Site is undergoing maintainence; please check back later.....'
//  });
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to handlebars based template page'
  });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
      pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
      errorMessage: 'Unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
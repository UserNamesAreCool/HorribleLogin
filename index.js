'use strict';
const express = require("express");
const morgan = require('morgan');
const session = require("express-session");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// The highest of quality username and passwords
let Users = {
    bob2121: 'iosjiogjsIEGosd:Igjes@@',
    zues43: '*@QTU*FUgvhuOPQ@*!#@%OAIHTiO*TGHVA',
    username: 'abc123'
}

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('trust proxy', 0);
app.set('view engine', 'handlebars');
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "soifhsiUZDHfasfwarwasfawdsuZ",
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => (req.session.username) ? res.render('index', req.session) : res.redirect('/login'));
app.get('/login', (req, res) => (req.session.username) ? res.redirect('/') : res.render('login'));

app.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if ((username in Users) && Users[username] === password) {
        req.session.username = username;
        res.redirect('/');
    } else res.redirect('/login');
});

app.listen(port, ()=> console.log(`http://localhost:${port}`));

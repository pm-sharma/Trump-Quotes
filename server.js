const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const quotes = require('./quotes.js');


const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(__dirname + '/views/images') );
app.set('view engine', hbs);


app.get('/', (req,res) => {
    res.render('front.hbs');
});


app.get('/quote', (req,res) => {
    quotes.getQuotes((error,quotes) => {
        if(error){
            res.render('fallacy.hbs')
        }
    else{
        res.render('result.hbs', {
            quote : quotes.message
        })
    }
})
});

    


app.listen(port, () => {
    console.log('Server is up at port ' + port);
});


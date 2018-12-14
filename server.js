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

    
// app.get('/locate', (req,res) => {
//     reverse.reverse(req.query.name_lat, req.query.name_lng, (errorMessage, nameresults) => {
//         if(errorMessage) {
//             res.render('result.hbs', {
//                 error : errorMessage
//             })
//         }
//         else {
//             geocode.geocodeAddress(nameresults.address, (errorMessage, results) => {
//                 if (errorMessage) {
//                     res.render('result.hbs', {
//                         error : errorMessage
//                     })

//                 }
//                 else {
//                     quotes.getquotes(results.latitute, results.longitude, (errorMessage, quotesResults) => {
//                         if (errorMessage) {
//                             res.render('result.hbs', {
//                                 error: errorMessage
//                             })
//                         }
//                         else {
//                             res.render('result.hbs', {
//                                 street : results.street + ' ',
//                                 area5 : results.area5 + ' ',
//                                 state : results.state + ' ' ,
//                                 country : results.country,
//                                 predict : quotesResults.prediction,
//                                 tempF : Math.round(quotesResults.temperature),
//                                 tempC : Math.round((quotesResults.temperature - 32)*(5/9)),
//                                 icon : quotesResults.icon,
//                                 body : JSON.stringify(results.body, undefined, 2),
//                                 summary : quotesResults.summary,
//                                 wind : quotesResults.wind,
//                                 humidity : Math.round((quotesResults.humidity)*100),
//                                 url : encodeURIComponent( results.street + ' ' + results.area5 + " "+ results.state + " " + results.country)

//                             });
//                             var ur = process.env.MONGODB_URI || 'mongodb://localhost:27017/quotes-search'; // for local host replace with it 'mongodb://localhost:27017/quotes-search';
//                             MongoClient.connect(ur,{ useNewUrlParser: true }, (erro,client) => {
//                                 if (erro){
//                                     return console.log('Unable to connect', erro);
//                                 };

//                                 console.log('Connected sucessfully');
//                                 const db = client.db('quotes-search');
//                                 db.collection('quotes-Data').insertOne({
//                                     'Location' : results.street + ' ' + results.area5 + " "+ results.state + " " + results.country,
//                                     'Temperature (deg C)' : Math.round((quotesResults.temperature - 32)*(5/9)),
//                                     'Wind (km/hr)' : quotesResults.wind,
//                                     'Humidity (%)' : Math.round((quotesResults.humidity)*100),
//                                     'TimeZone' : new Date().getTimezoneOffset(),
//                                     'Date' : new Date().toLocaleString("en-US", {timeZone: "Asia/Calcutta"}),
//                                     'Live' : 'True'
//                                 }, (erro, result) => {
//                                     if (erro) {
//                                         return console.log('Unable to add the quotes data', erro);
//                                     }
//                                     console.log(JSON.stringify(result.ops, undefined, 2));
//                                 })
//                                 client.close();
//                             });
//                         }
//                     });
//                 }
//             });
//         }
//     });

// });

app.listen(port, () => {
    console.log('Server is up at port ' + port);
});


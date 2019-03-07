
var camelcase = require('camelcase');
var _ = require('lodash');

var repeat = require('repeat-string');
    console.log(repeat('B', 5));

var longestStreak = require('longest-streak');
    console.log(longestStreak('` foo `` bar `', '`')) // => 2

const skinTone = require('skin-tone');
    

//console.log(camelcase('foo-bar'));
//console.log(_('foo-bar'));

const express = require('express')
const app = express()
const port = 3000

var path = require('path');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use('/static', express.static('static'))
app.post('/', function (req, res) {
    res.send('Got a POST request')
})
app.get('/', function (req, res) {
    res.render('index.pug')
})

app.use("/static", express.static(path.join(__dirname, "public")));




app.get('*', (req, res) => {
    res.render('static' + req.url, function (err, html) {
        if (!err) { return res.send(html) }
        // Not super elegant the `indexOf` but useful
        if (err.message.indexOf('Failed to lookup view') !== -1) {
            return res.render('root/error')
        }
        throw err
    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

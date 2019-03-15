var camelcase = require('camelcase');
var _ = require('lodash');
var repeat = require('repeat-string');
var longestStreak = require('longest-streak');
var skinTone = require('skin-tone');
var bodyParser = require('body-parser')
var path = require('path');
//console.log(camelcase('foo-bar'));
//console.log(_('foo-bar'));
//console.log(repeat('B', 5));
//console.log(longestStreak('` foo `` bar `', '`')) // => 2

const express = require('express')
const app = express()
const port = 3000

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use('/static', express.static('static'))

app.post('/', function (req, res) {
    res.send('Got a POST request')
})
app.get('/', function (req, res) {
    res.render('pages/index')
})
app.get('/', function (req, res) {
    res.render('/pages/profile')
})


app.use(express.static(path.join(__dirname, "/static")))



function notFound(req, res) {
    res.status(404).render('./pages/error.ejs')
}

app.get('*', (req, res) => {
    res.render('static' + req.url, function (err, html) {
        if (!err) {
            return res.send(html)
        }
        // Not super elegant the `indexOf` but useful
        if (err.message.indexOf('Failed to lookup view') !== -1) {
            return res.render('./pages/error.ejs')
        }
        throw err
    })
})






app.listen(port, () => console.log(`Example app listening on port ${port}!`))

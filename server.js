var camelcase = require('camelcase');
var _ = require('lodash');
var repeat = require('repeat-string');
var longestStreak = require('longest-streak');
var skinTone = require('skin-tone');
var bodyParser = require('body-parser')
var path = require('path');
var find = require('array-find');
// var slug = require('slug')
// var bodyParser = require('body-parser')

//console.log(camelcase('foo-bar'));
//console.log(_('foo-bar'));
//console.log(repeat('B', 5));
//console.log(longestStreak('` foo `` bar `', '`')) // => 2




const express = require('express')
const app = express()
const port = 3000

var data = [
    {
        id: 'red-dead-redemption-2',
        title: 'Red Dead Redemption 2',
        cover: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg'
    },
    {
        id: 'gta-v',
        title: 'Grand Theft Auto 5',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/71fdwUZvh2L._SL1000_.jpg'
    }
]







app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use('/static', express.static('static'))
// app.use(bodyParser.urlencoded({
//     extended: true
// }))




app.post('/', function (req, res) {
    res.send('Got a POST request')
})
app.get('/', function (req, res) {
    res.render('pages/index')
})
app.get('/profile', function (req, res) {
    res.render('pages/profile')
})

// app.get('/games', function (req, res) {
//     res.render('pages/games')
// })
app.get('/games', games)
app.get('/:id', game)


app.get('/chat', function (req, res) {
    res.render('pages/chat')
})

// function (req, res) {
//     res.render('my-list.ejs', {data: data})
// }

function games(req, res) {

    var doc = '<!doctype html>'
    var length = data.length
    var index = -1
    var game


    doc += '<title>All games</title>'
    doc += '<h1>Games</h1>'

    while (++index < length) {
        game = data[index]
        doc += '<h2><a href="/' + game.id + '">' + game.title + '</a></h2>'
        doc += '<p>' + game.cover + '</p>'
    }


    res.render('pages/games.ejs', {data: data})

    
}

function game(req, res, next) {
    var id = req.params.id
    var doc = '<!doctype html>'
    var game = find(data, function (value) {
        return value.id === id
    })
    doc += '<title>' + game.title + ' - My game website</title>'
    doc += '<h1>' + game.title + '</h1>'
    doc += '<p>' + game.description + '</p>'

    res.render('pages/game.ejs', {data: game})



}



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
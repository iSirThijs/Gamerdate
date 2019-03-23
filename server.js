var bodyParser = require('body-parser')
var path = require('path');
var slug = require('slug')
var bodyParser = require('body-parser')
var request = require('request')
var multer = require('multer')

request('http://www.google.com', function (error, response, body) {

    console.log('error:', error);
    console.log('statusCode:', response);
    console.log('body:', body);

});

const express = require('express')
const app = express()
const port = 3000

var data = [
    {
        id: 'red-dead-redemption-2',
        title: 'Red Dead Redemption 2',
        cover: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
        description: 'Beste spel ever! echt leuk!'
    },
    {
        id: 'gta-v',
        title: 'Grand Theft Auto 5',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/71fdwUZvh2L._SL1000_.jpg',
        description: 'Gta online blijft leuk !'
    }
]

var upload = multer({
    dest: 'static/uploads/'
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use('/static', express.static('static'))
app.use(bodyParser.urlencoded({extended:true}))
// app.post('/', function (req, res) {
//     res.send('Got a POST request')
// })
app.delete('/profile:id', remove)
app.get('/', function (req, res) {
    res.render('pages/index')
})
app.get('/profile', profile) 
app.get('/chat', function (req, res, next) {
    res.render('pages/chat')
})

// app.get('/games', games)

// app.get('/add', form)
// app.get('/:id', game)
app.post('/profile', upload.single('cover'), add)

// function (req, res) {
//     res.render('my-list.ejs', {data: data})
// }

function profile(req, res) {
    res.render('pages/profile', {
        data: data
    })
}

// function games(req, res) {
//     var doc = '<!doctype html>'
//     var length = data.length
//     var index = -1
//     var game

//     doc += '<title>All games</title>'
//     doc += '<h1>Games</h1>'

//         while (++index < length) {
//             game = data[index]
//             doc += '<h2><a href="/' + game.id + '">' + game.title + '</a></h2>'
//             doc += '<p>' + game.cover + '</p>'
//         }
//         res.render('pages/games', {
//             data: data
//         })
// }

// function form(req,res){

//     res.render('pages/add')
// }
function add (req,res) {
    var id = slug(req.body.title).toLowerCase()

    data.push({
        id: id,
        title: req.body.title,
        cover: req.file ? req.file.filename : null,
        description: req.body.description
    })
    res.redirect('/profile')
}

function remove(req, res) {
    var id = req.params.id

    data = data.filter(function (value) {
        return value.id !== id
    })

    res.json({
        status: 'ok'
    })
    res.redirect('/profile')
}

// function game(req, res, next) {
//     var id = req.params.id
//     var doc = '<!doctype html>'
//     var game = find(data, function (value) {
//         return value.id === id
//     })
//     doc += '<title>' + game.title + ' - My game website</title>'
//     doc += '<h1>' + game.title + '</h1>'
//     doc += '<img src="' + game.cover + '">' 

//     res.send(doc)
//     res.render('pages/game', {
//         data: game
//     })
// }


app.use(express.static(path.join(__dirname, '/static')))

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



var path = require('path');
var slug = require('slug')
var bodyParser = require('body-parser')
var request = require('request')
var multer = require('multer')
var mongo = require('mongodb')
//var find = require('array-find');

var session = require('express-session')

require('dotenv').config()

var db = null
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT

mongo.MongoClient.connect(url, function (err, client) {
    if (err) throw err
    db = client.db(process.env.DB_NAME)
})



//console.log(camelcase('foo-bar'));
//console.log(_('foo-bar'));
//console.log(repeat('B', 5));
//console.log(longestStreak('` foo `` bar `', '`')) // => 2

request('http://www.google.com', function (error, response, body) {

    console.log('error:', error);
    console.log('statusCode:', response);
    console.log('body:', body);

});





const express = require('express')
const app = express()
const port = 3000



// var data = [
//     {
//         id: 'red-dead-redemption-2',
//         title: 'Red Dead Redemption 2',
//         cover: 'Red_Dead_Redemption_II.jpg',
//         description: 'Beste spel ever! echt leuk!'
//     },
//     {
//         id: 'gta-v',
//         title: 'Grand Theft Auto 5',
//         cover: 'gta.jpg',
//         description: 'Gta online blijft leuk !'
//     }
// ]


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
app.get('/chat', function (req, res) {
    res.render('pages/chat')
})
app.get('/sign-up', signup)

app.get('/log-in', login)
//app.post('/log-in', add)
app.post('/profile', upload.single('cover'), add)
app.delete('/profile:id', remove)
app.get('/', function (req, res) {
    res.render('pages/index')
})
app.get('/profile', profile) 

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))



// app.get('/games', games)

// app.get('/add', form)
// app.get('/:id', game)


// function (req, res) {
//     res.render('my-list.ejs', {data: data})
// }

function profile(req, res, next) {
    db.collection('game').find().toArray(done)

    function done(err, data){
        if (err) {
            next(err)
        } else {
        res.render('pages/profile.ejs', {
            data: data,
            user: req.session.user
        })
        }
    }
}






// OLD GAMES FUNCTION
// function games(req, res, next) {
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
function add (req,res, next) {
   var id = slug(req.body.title).toLowerCase()

    if (!req.session.user) {
        res.status(401).send('Credentials required')
        return
    }
    // data.push({
    //     id: id,
    //     title: req.body.title,
    //     cover: req.file ? req.file.filename : null,
    //     description: req.body.description
    // })
    db.collection('game').insertOne({
        title: req.body.title,
        cover: req.file ? req.file.filename : null,
        description: req.body.description
    }, done)
function done (err, data){
    if (err){
        next(err)
    } else {
        res.redirect('/profile')
    }
}


}

function remove(req, res, next) {
    var id = req.params.id

if (!req.session.user) {
    res.status(401).send('Credentials required')
    return
}

    db.collection('game').deleteOne({
        _id: mongo.ObjectID(id)
    }, done)
    


function done (err) {
    if(err) {
        next(err)
    } else {
        res.json({status: 'ok'}) 
    }
}
    data = data.filter(function (value) {
        return value.id !== id
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

function signup(req, res, next) {
    function onhash(hash) {
        function oninsert(err) {
            if(err) {
                next(err)
            } else {
                req.session.user = {username:username}
                res.redirect('/')
            }
        }
    }
    res.render('pages/sign-up')
}
function login(req, res, next){
    function done(err, data){
        function onverify(match) {
            if (match) {
                req.session.user = {username: user.username}
                res.redirect('/')
            } else {
                res.status(401).send('Password incorrect')
                next(err)
            }
        }
    }
}


app.use(express.static(path.join(__dirname, '/static')))

// function notFound(req, res) {
//     res.status(404).render('./pages/error.ejs')
// }


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



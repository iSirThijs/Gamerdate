var path = require('path');
var bodyParser = require('body-parser')
var request = require('request')
var multer = require('multer')
var mongo = require('mongodb')
var session = require('express-session')
var mongoose = require('mongoose');
var passport = require('passport')
    LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require('passport-local-mongoose')
//var find = require('array-find')
//var slug = require('slug')
var UserSchema = new mongoose.Schema({});



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

UserSchema.plugin(passportLocalMongoose);
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var data = [
    {
        id: 'red-dead-redemption-2',
        title: 'Red Dead Redemption 2',
        cover: 'Red_Dead_Redemption_II.jpg',
        description: 'Beste spel ever! echt leuk!'
    },
    {
        id: 'gta-v',
        title: 'Grand Theft Auto 5',
        cover: 'gta.jpg',
        description: 'Gta online blijft leuk !'
    },
    {
        id: '1',
        username: 'Giovanni',
        console: 'ps4'
    }
]


var upload = multer({
    dest: 'static/uploads/'
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use('/static', express.static('static'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({extended: true}))
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))
app.use(passport.initialize())
app.use(passport.session())
app.get('/chat', chat)
app.get('/', renderHome)
app.get('/profile', profile)
app.get('/sign-up', renderSignup)
app.post('/sign-up', signup)

app.get('/login', renderLogin)
app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));
app.post('/profile', upload.single('cover'), addGame)
app.delete('/profile:id', removeGame)


app.use(function (req, res, next) {
    res.locals.user = null
    next()
})



function renderHome(req, res) {
    res.render('pages/index')
}

function chat(req, res) {
    res.render('pages/chat')
}


// app.get('/games', games)

// app.get('/add', form)
// app.get('/:id', game)




function profile(req, res, next) {
    db.collection('game').find().toArray(done)
    db.collection('user').find().toArray(done)

    function done(err, data) {
        if (err) {
            next(err)
        } else {
            res.render('pages/profile.ejs', {
                data: data[0],
                user: req.body.user
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
function addGame(req, res, next) {
    

    if (!req.session.user) {
        res.status(401).send('Credentials required')
        return
    } else {
        res.redirect('/sign-up')
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

    function done(err) {
        if (err) {
            next(err)
        } else {
            res.redirect('/profile')
        }
    }


}

function removeGame(req, res, next) {
    var id = req.params.id

    if (!req.session.user) {
        res.status(401).send('Credentials required')
        return
    }

    db.collection('game').deleteOne({
        _id: mongo.ObjectID(id)
    }, done)



    function done(err) {
        if (err) {
            next(err)
        } else {
            res.json({
                status: 'ok'
            })
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

function renderSignup(req, res){
res.render('pages/sign-up')
}

function signup(req, res) {

User.register(new User({
    username: req.body.username
}), req.body.password, function (err, user) {
    if (err) {
        console.log(err);
        return res.render('pages/sign-up')
    } else {
        passport.authenticate('local')(req, res, function () {
            res.redirect('/profile')
        });
    }
});






    //   db.collection('user').insertOne({
    //       username: req.body.username,
    //       console: req.body.console
    //   }, done)

    //   function done(err) {
    //       if (err) {
    //           next(err)
    //       } else {
    //            res.redirect('/profile')
    //           }
             
    //       }


      }

    // function onhash(hash) {
    //     function oninsert(err) {
    //         if (err) {
    //             next(err)
    //         } else {
    //             req.session.user = {
    //                 username: username
    //             }
    
    //         }
    //     }
    // }
    
// }

function renderLogin(req, res) {
    res.render('pages/login')
}
function login(req, res, next) {
    function done(err, data) {
        function onverify(match) {
            if (match) {
                req.session.user = {
                    username: user.username
                }
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



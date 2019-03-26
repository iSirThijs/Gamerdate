
var path = require('path');
var slug = require('slug')
var bodyParser = require('body-parser')
var request = require('request')
var multer = require('multer')
var mongo = require('mongodb')
//var find = require('array-find');

var session = require('express-session')

require('dotenv').config()



var {
    profile,
    addGame,
    removeGame,
    signup,
    login
} = require('./routes/routes.js')






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
app.post('/profile', upload.single('cover'), addGame)
app.delete('/profile:id', removeGame)
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



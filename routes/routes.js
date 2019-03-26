// function (req, res) {
//     res.render('my-list.ejs', {data: data})
// }




function profile(req, res, next) {
    db.collection('game').find().toArray(done)

    function done(err, data) {
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
function addGame(req, res, next) {
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

    function done(err, data) {
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

function signup(req, res, next) {
    function onhash(hash) {
        function oninsert(err) {
            if (err) {
                next(err)
            } else {
                req.session.user = {
                    username: username
                }
                res.redirect('/')
            }
        }
    }
    res.render('pages/sign-up')
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


module.exports = { profile, addGame, removeGame, signup, login };
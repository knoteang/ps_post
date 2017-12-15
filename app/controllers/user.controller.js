var User = require('mongoose').model('User');
var path = require("path");

exports.getUsers = (req, res, next) => {
    User.find((err, user) => {
        if (err) {
            console.log('Failure');
            return next(err);
        }
        else {
            console.log('Success');
            res.json(user);
        }
    });
}

exports.getUserOne = (req, res, next) => {
    User.findOne({
        username: req.params.username
    }, function (err, user) {
        if (user) {
            console.log('Success');
            res.json(user);
        }
        else {
            console.log('Failure');
            return next(err);
        }
    });
}

exports.deleteUser = (req, res, next) => {
    User.findOneAndRemove({ _id: req.params.id }, req.body, (err, post) => {
        if (err) {
            return next(err);
        } else {
            console.log('Success');
        }
    });
}

exports.create = (req, res, next) => {
    var user = new User(req.body);
    user.save((err) => {
        if (err) {
            console.log('Failure');
            return next(err);
        }
        else {
            console.log('Success');
            res.json(user);
        }
    });
}

exports.edit = (req, res, next) => {
    User.findOneAndUpdate({
        username: req.body.username
    }, req.body, function (err, user) {
        if (err) {
            console.log('Failure');
            return next(err);
        }
        else {
            console.log('Success');
            res.json(user);
        }
    });
}



exports.login = (req, res) => {
    if (!req.user) {
        res.sendFile((path.join(__dirname + '/../views/login.html')));
    }
    else {
        return res.redirect('/home');
    }
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

exports.saveOAuthUserProfile = (req, profile, done) => {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function (err, user) {
        if (err) return done(err);
        else {
            if (!user) {
                var possibleUsername = profile.username
                    || (profile.email ? profile.email.split('@')[0] : '');
                console.log('NAME: ' + profile.username);
                User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
                    profile.username = availableUsername;
                    user = new User(profile);
                    user.save((err) => {
                        if (err) { return req.res.redirect('/login'); }
                        else {
                            return done(err, user);
                        }
                    })
                });
            }
            else {
                return done(err, user);
            }
        }
    });
}
const router = require('express').Router();
let User = require('../models/usermodel');

router.route('/').get((req, res) => {
    User.find().then(user => res.json(user)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const mail = req.body.mail;
    
    const newUser = new User({login, password, mail,});
    
    newUser.save().then(() => res.json('User registered')).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
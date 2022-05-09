const router = require('express').Router();
// const passport = require('passport');
// const session = require("express-session");
// const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let User = require('../models/usermodel');

router.route('/').get((req, res) => {
    User.find().then(user => res.json(user)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
    
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const login = req.body.login;
    const password = hash;
    const mail = req.body.mail;
        const newUser = new User({login, password, mail,});
        
        newUser.save().then(() => res.json('User registered')).catch(err => res.status(400).json('Error: ' + err));   
     });
    
});

router.route('/login').post((req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    User.findOne({login: login}).then((foundUser) =>{
        if(foundUser){
                bcrypt.compare(password, foundUser.password).then( function(result){
                   
                    if(result === true){
                        res.redirect('../page.html');
                    } 
                    else{
                        res.send("wrong password");
                        // res.redirect('../');
                    }
                });
            }
            else{
                res.send("wrong username");
            }
        }).catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;


// , (err, foundUser) => {
//     if(err){
//         console.log(err);
//     } else {
//         if(foundUser){
//             if(foundUser.password === password){
//                 res.redirect('../page.html');
//             } else{
//                 console.log("wrong username or password");
//             }
//         }
//         else{
//             console.log("wrong username or password");
//         }
//     }
// }); 
// bcrypt.hash(req.body.password, saltRounds, function(hash) =>{
    // const login = req.body.login;
    // const password = req.body.password;

    // User.findOne({login: login}).then((foundUser) =>{
    //         if(foundUser){
    //             if(foundUser.password === password){
    //                 res.redirect('../page.html');
    //             }
    //         }
    //         else{
    //             res.redirect('../');
    //         }
    //     }).catch(err => res.status(400).json('Error: ' + err));
    // });
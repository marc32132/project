const router = require('express').Router();
// const passport = require('passport');
// const session = require("express-session");
// const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let User = require('../models/usermodel');
const { findOne } = require('../models/usermodel');

router.route('/').get((req, res) => {
    User.find().then(user => res.json(user)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
    
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const login = req.body.login;
    const password = hash;
    const mail = req.body.mail;
    const position = req.body.position;
        const newUser = new User({login, password, mail, position});
        
        newUser.save().then(() => res.redirect('../index.html')).catch(err => res.status(400).json('Error: ' + err));   
     });
    
});

router.route('/login').post((req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const position = req.body.position;
    
    User.findOne({login: login}).then((foundUser) =>{
        if(foundUser){
                bcrypt.compare(password, foundUser.password).then( function(result){
                   
                    if(result === true){
                        if(login == 'admin')
                        res.redirect('../admin-page-students.html');
                        else if(foundUser.position == position && position == 'Teacher')
                        res.redirect('../teacher-page.html');
                        else
                        res.redirect('../student-page.html');
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

router.route('/updateUser').post((req, res) =>{
    const userName = req.body.login;
    const password = req.body.password;
    const password2 = req.body.password2;
    if(password==password2){
    User.findOne({login: userName}).then((foundUser) =>{
        if(foundUser){
            bcrypt.hash(password, saltRounds, function(err, hash){
            User.findOneAndUpdate({login: userName}, {password: hash}, 
                function(err, passw){
                    if(!err){
                        console.log("password changed for user: ", userName);
                        res.redirect('back');
                    } else {
                        res.send(err);
                    }
                });});
        } else{
            res.send("wrong username");
        }
    }).catch(err => res.status(400).json('Error: ' + err));
}else {
    res.send("passwords don't match");
};
});
 
    


module.exports = router;


// , (err, foundUser) => {
//     if(err){
//         console.log(err);
//     } else {
//         if(foundUser){
//             if(foundUser.password === password){
//                 res.redirect('../.html');
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
    //                 res.redirect('../.html');
    //             }
    //         }
    //         else{
    //             res.redirect('../');
    //         }
    //     }).catch(err => res.status(400).json('Error: ' + err));
    // });
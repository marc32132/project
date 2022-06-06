const router = require('express').Router();
const passport = require('passport');
// const session = require("express-session");
// const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
let User = require('../models/usermodel');

require('dotenv').config();


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

// router.route('/login').post((req, res, next) => {
//     passport.authenticate('local',{ 
//         successRedirect: '../admin-page-students.html' || '../teacher-page.html' || '../student-page.html',
//         failureRedirect: '/index.html'
//     })(req, res, next) 
// });

router.route('/logout').get((req, res) =>{
    // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.cookie('jwt','', {maxAge: 1});
    res.redirect('/index.html');
})

router.route('/login').post((req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const position = req.body.position;
    
    User.findOne({login: login}).then((foundUser) =>{
        if(foundUser){
                bcrypt.compare(password, foundUser.password).then( function(result){
                   
                    if(result === true){
                        if(foundUser.position == 'admin'){
                        

                        const user = {name: login, position: foundUser.position}

                        const accessToken = generateAccessToken(user);
                        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
                        // res.json({accessToken: accessToken})
                        res.cookie('jwt', accessToken, {maxAge: 1000*60*10});
                        res.redirect('../admin-page-students.html');
                        }
                        else if(foundUser.position == position && position == 'Teacher'){
                        
                        const user = {name: login, position: foundUser.position}

                        const accessToken = generateAccessToken(user);
                        
                        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
                        res.cookie('jwt', accessToken, {maxAge: 1000*60*10});
                        res.redirect('../teacher-page.html');
                        }
                        else if(foundUser.position == position && position == 'Student'){
                        const user = {name: login, position: foundUser.position}

                        const accessToken = generateAccessToken(user);
                        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
                        res.cookie('jwt', accessToken, {maxAge: 1000*60*10});
                        res.redirect('../student-page.html');
                        // res.json({
                        //     accessToken: accessToken 
                        //     // refreshToken: refreshToken
                        // })
                        }
                        else{
                            res.send("wrong position")
                        }
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

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}

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
 
router.route('/currentUser').get((req,res) => {
    res.json(req.user); 
})

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
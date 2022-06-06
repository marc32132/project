// const LocalStrategy = require('passport-local').Strategy;
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const User = require('../models/usermodel');


// module.exports = function(passport){
//     passport.use(
//         new LocalStrategy({usernameField:'login'}, (login, password, done) =>{
//             User.findOne({login: login})
//             .then(user => {
//                 if(!user){
//                     return done(null, false, {message: 'That username is not registered'});
//                 }

//                 bcrypt.compare(password, user.password, (err, isMatch) => {
//                     if(err) throw err;

//                     if(isMatch){
//                         return done(null, user);
//                     } else {
//                         return done(null, false, {message: 'Password incorrect'});
//                     }
//                     // if(result === true){
//                     //     if(user.position == 'admin')
//                     //     res.redirect('../admin-page-students.html');
//                     //     else if(user.position == position && position == 'Teacher')
//                     //     res.redirect('../teacher-page.html');
//                     //     else if(user.position == position && position == 'Student')
//                     //     res.redirect('../student-page.html');
//                     // } 
//                     // else{
//                     //     res.send("wrong password");
//                     //     // res.redirect('../');
//                     // }
//                 });
//             })
//             .catch(err => console.log(err));
//         })
//     );

//     passport.serializeUser((user, done) =>{
//         done(null, user.id);
//     });

//     passport.deserializeUser((id, done)=>{
//         User.findById(id, (err, user) =>{
//             done(err, user);
//         });
//     });
// }
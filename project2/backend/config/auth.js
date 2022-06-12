// module.exports = {
//     ensureAuthenticated: function(req, res, next) {
//         if(req.isAuthenticated()){
//             return next();
//         }
//         res.redirect('/index.html');
//     }
// }
require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports = { authenticateToken: function(req, res, next){
    const token = req.cookies.jwt;
    if(token == null){ return console.log("token : ", token), res.sendStatus(401)}
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) {return console.log("user: ", user), res.sendStatus(403)}
        req.user = user;
        next();
    })
}
}

// ACCESS_TOKEN_SECRET=cfe0a575326b0b4b07c0f72912b28a38e42e917b1283da8798abf80caf8adbb21b35f33a3306f6bf13bac1082ad535996fcada713e282346c6bc738d0993fa6e
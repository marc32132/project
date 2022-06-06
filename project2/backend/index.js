const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
// const session = require('express-session');
// const passport = require('passport');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// require('./config/passport')(passport);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', require('./routes/index.js'));
app.use(express.static('../frontend2/public'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
});

// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());



const userRouter = require('./routes/user');
app.use('/user', userRouter);

const manage = require('./routes/admin');
app.use('/admin', manage);

const classOperations = require('./routes/class');
app.use('/class', classOperations);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
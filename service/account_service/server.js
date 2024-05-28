require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { errorHandler } = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3500;
const MONGO_URI = process.env.MONGO_URI

//------------ Mongo Connection ------------//
mongoose.connect(MONGO_URI)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

const app = express();

//built-in middleware to handler urlencoded data
// in other word, form data:
//'content-type': application/x-www-form-urlencoded
// app.use(express.urlencoded({
//     extended: false
// }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// built-in middleware for json
app.use(express.json());

app.use('/', (req, res) => {
    res.send('Hello World');
});

app.use('/user', require('./routes/user.route.js'));
app.use("/admin", require("./routes/admin.route.js"));

// Route handlers
app.all('/*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({
            error: '404 NOT FOUND',
        })
    }
    else {
        res.type('txt').send('404 NOT FOUND');
    }
});

// middleware handles error
app.use(errorHandler);

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
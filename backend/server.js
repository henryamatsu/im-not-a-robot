require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const scoreboardRouter = require('./routes/scoreboard');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/scoreboard', scoreboardRouter);

mongoose.connect(process.env.dbURI)
.then(() => {

    app.listen(process.env.PORT, () => {
        console.log('Server running on port ' + process.env.PORT);
    });

});


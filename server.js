const express = require('express');
const routes = require('./routes/lebensmittelroutes');
const breirezeptroutes = require('./routes/breirezeptroutes');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Hochgeladene Bilder für den Browser bereitstellen
app.use('/uploads', express.static('uploads'));

app.use('/', routes);
app.use(breirezeptroutes);


// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE });
const db = mongoose.connection;
db.on('error', err => {
  console.log(err);
});
db.on('open', () => {
    console.log('connected to DB');
});

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);
    }
});
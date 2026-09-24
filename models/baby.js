const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    vorname: {

        type: String,

        required: true

    },

    geburtsdatum: {

        type: String,

        required: true

    },

    geschlecht: {

        type: String,

        required: true

    },

    allergien: [String] // denn mehrere Allergien sind möglich

});

module.exports = mongoose.model('Baby', schema);
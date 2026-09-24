const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    zutaten: [{
    
        lebensmittel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lebensmittel',
            required: true
        },

        menge: {
            type: Number,
            required: true
        },

        einheit: {
            type: String,
            enum: ["g", "ml", "Stück"],
            required: true
        }
    }],

    altersempfehlung: {
        type: String,
        required: true
    },

    beschreibung: String

});

module.exports = mongoose.model('BreiRezept', schema);
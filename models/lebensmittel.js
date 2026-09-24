const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    kategorie: {
        type: String,
        enum: ["Obst","Gemüse","Getreide","Fleisch","Fisch","Milchprodukte","andere Kategorie"],
        required: true
    },
    altersempfehlung: {
        type: String,
        required: true,
    },
    allergen: {
        type : String,
        enum:["keines", "Milch","Ei","Nüsse","Fisch","Gluten"],
        required: true
    },
    vitamine: [String],
    beschreibung: String, 
    bild:{
        type: String,
        required: true
    } 
});

module.exports = mongoose.model('Lebensmittel', schema);
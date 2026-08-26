const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    kategorie:{
        type: String,
        enum: ["Obst","Gemüse","Getreide","Fleisch","Fisch","Milchprodukte","andere Kategorie"]
    },
    altersempfehlung: String,
    allergen: {
        type : String,
        enum:["keines", "Milch","Ei","Nüsse","Fisch","Gluten"],
        required: true
    },
    beschreibung: String, 
    bild: String
});

module.exports = mongoose.model('Lebensmittel', schema);
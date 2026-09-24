const express = require('express');
const router = express.Router();

const BreiRezept = require('../models/BreiRezept');

const express = require('express');
const router = express.Router();
const BreiRezept = require('../models/BreiRezept');


// alle Brei Rezepte auslesen
router.get('/brei-rezepte', async (req, res) => {
    const alleBreiRezepte = await BreiRezept.find().populate('zutaten.lebensmittel'); // lädt die zugehörige LbM aus DB

    res.send(alleBreiRezepte);
});


// ein Brei Rezept auslesen
router.get('/brei-rezepte/:id', async (req, res) => {
    try {
        const breiRezept = await BreiRezept.findById(req.params.id).populate('zutaten.lebensmittel'); // sucht nacht dem LbM im DB anhand der iD 

        res.send(breiRezept);
    } catch (error) {
        res.status(404);
        res.send({
            error: "Brei-Rezept nicht gefunden."
        });
    }
});


module.exports = router;
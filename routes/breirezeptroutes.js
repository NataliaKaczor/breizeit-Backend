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

router.post('/', async (req, res) => {

    try {

        const neuesBreiRezept = new BreiRezept({
            name: req.body.name,
            zutaten: req.body.zutaten,
            altersempfehlung: req.body.altersempfehlung,
            beschreibung: req.body.beschreibung
        });

        const gespeichertesBreiRezept = await neuesBreiRezept.save();

        console.log(
            'Neues Brei-Rezept erstellt:',
            gespeichertesBreiRezept._id
        );
        res.status(201);
        res.send(gespeichertesBreiRezept);

    } catch (error) {

        res.status(400);
        res.send({
            error: "Das Brei-Rezept konnte nicht erstellt werden."
        });
    }
});

router.delete('/brei-rezepte/:id', async (req, res) => {

    try{

        const result = await BreiRezept.deleteOne({
            _id: req.params.id
        });

        res.status(204);
        res.send();

    } catch {

        res.status(404);
        res.send({
            error: "Brei-Rezept existiert nicht!"
        });
    }
});


module.exports = router;
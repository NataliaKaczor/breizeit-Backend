const express = require('express');
const router = express.Router();
const Lebensmittel = require('../models/lebensmittel')

//  alle Lebensmittel auslesen
router.get('/lebensmittel', async (req, res) => {
    const alleLebensmittel = await Lebensmittel.find();
    res.send(alleLebensmittel);
});


// ein neues Lebensmittel eintragen 
router.post('/', async (req, res) =>{
    try {
        const neuerLebensmittel = new Lebensmittel({
            name: req.body.name,
            kategorie: req.body.kategorie,
            altersempfehlung: req.body.altersempfehlung,
            allergen: req.body.allergen,
            beschreibung: req.body.beschreibung,
            bild: req.body.bild
        });

        const gespeichertesLebensmittel = await neuerLebensmittel.save();
        console.log('Neues Lebensmittel erstellt:', gespeichertesLebensmittel._id);
        res.status(201);
        res.send(gespeichertesLebensmittel);} 

    catch (error) {
        res.status(400);
        res.send({ error: "Das Lebensmittel konnte nicht erstellt werden." });
    }
});

// ein Lebensmittel loeschen
router.delete('/lebensmittel/:id', async (req, res) => {
    try {
        const result = await Lebensmittel.deleteOne({
            _id: req.params.id
        });

        res.status(204);
        res.send();

    } catch {
        res.status(404);
        res.send({
            error: "Lebensmittel existiert nicht!"
        });
    }
});

module.exports = router;
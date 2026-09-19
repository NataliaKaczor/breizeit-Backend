const express = require('express');
const router = express.Router();
const Lebensmittel = require('../models/lebensmittel')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // wenn datei dannlegt multer diese in /uploads Ordner
//  alle Lebensmittel auslesen
router.get('/lebensmittel', async (req, res) => {
    const alleLebensmittel = await Lebensmittel.find();
    res.send(alleLebensmittel);
});
//  ein Lebensmittel auslesen
router.get('/lebensmittel/:id', async (req, res) => {
    try {
        const lebensmittel = await Lebensmittel.findById(req.params.id);
        res.send(lebensmittel);
    } catch (error) {
        res.status(404);
        res.send({
            error: "Lebensmittel nicht gefunden."
        });
    }
});


// ein neues Lebensmittel eintragen 
router.post('/', upload.single('bild'), async (req, res) => {
    console.log('Empfangene Datei:', req.file);
    console.log('Empfangene Daten:', req.body);
    console.log('Bild-Pfad zum Speichern:', req.file.path);
    try {
        const neuerLebensmittel = new Lebensmittel({
            name: req.body.name,
            kategorie: req.body.kategorie,
            altersempfehlung: req.body.altersempfehlung,
            allergen: req.body.allergen,
            beschreibung: req.body.beschreibung,
            bild: req.file.path
        });

        const gespeichertesLebensmittel = await neuerLebensmittel.save();
        console.log('Neues Lebensmittel erstellt:', gespeichertesLebensmittel._id);
        res.status(201);
        res.send(gespeichertesLebensmittel);
    }

    catch (error) {
        if (error.code === 11000) {
            res.status(409);
            res.send({
                error: "Dieses Lebensmittel existiert bereits."
            });
            return;
        }

        res.status(400);
        res.send({
            error: "Das Lebensmittel konnte nicht erstellt werden."
        });
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
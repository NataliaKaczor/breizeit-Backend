const express = require('express');
const router = express.Router();
const Lebensmittel = require('../models/lebensmittel')

//  alle Lebensmittel auslesen
router.get('/lebensmittel', async (req, res) => {
    const alleLebensmittel = await Lebensmittel.find();
    res.send(alleLebensmittel);
});

module.exports = router;